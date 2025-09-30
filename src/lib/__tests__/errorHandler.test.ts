import {
  createAppError,
  handleApiError,
  handleFileError,
  getDisplayMessage,
  logError,
  AppError,
  ErrorType
} from "../errorHandler";

// console.group, console.log, console.error, console.groupEnd をモック
const mockConsoleGroup = jest.spyOn(console, 'group').mockImplementation();
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
const mockConsoleGroupEnd = jest.spyOn(console, 'groupEnd').mockImplementation();

describe("errorHandler", () => {
  beforeEach(() => {
    // 各テストの前にモックをクリア
    jest.clearAllMocks();
  });

  afterAll(() => {
    // テスト終了後にモックを復元
    mockConsoleGroup.mockRestore();
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
    mockConsoleGroupEnd.mockRestore();
  });

  describe("createAppError", () => {
    it("基本的なAppErrorオブジェクトを作成する", () => {
      const error = createAppError('API_ERROR', 'Test error message');

      expect(error.type).toBe('API_ERROR');
      expect(error.message).toBe('Test error message');
      expect(error.timestamp).toBeInstanceOf(Date);
      expect(error.originalError).toBeUndefined();
    });

    it("originalErrorを含むAppErrorオブジェクトを作成する", () => {
      const originalError = new Error('Original error');
      const error = createAppError('NETWORK_ERROR', 'Network error', originalError);

      expect(error.originalError).toBe(originalError);
    });
  });

  describe("handleApiError", () => {
    it("ネットワークエラーを正しく分類する", () => {
      const fetchError = new Error('fetch failed');
      const error = handleApiError(fetchError, 'データ取得');

      expect(error.type).toBe('NETWORK_ERROR');
      expect(error.message).toContain('ネットワークエラーが発生しました: データ取得');
    });

    it("通常のAPIエラーを正しく分類する", () => {
      const apiError = new Error('API error');
      const error = handleApiError(apiError, 'ユーザー情報取得');

      expect(error.type).toBe('API_ERROR');
      expect(error.message).toContain('API呼び出しエラー: ユーザー情報取得');
    });

    it("不明なエラーを正しく処理する", () => {
      const unknownError = 'string error';
      const error = handleApiError(unknownError, 'テスト');

      expect(error.type).toBe('UNKNOWN_ERROR');
      expect(error.message).toContain('不明なエラー: テスト');
    });
  });

  describe("handleFileError", () => {
    it("ファイル名ありでエラーを処理する", () => {
      const fileError = new Error('File read failed');
      const error = handleFileError(fileError, 'test.csv');

      expect(error.type).toBe('FILE_ERROR');
      expect(error.message).toContain('ファイル "test.csv" の処理中');
    });

    it("ファイル名なしでエラーを処理する", () => {
      const fileError = new Error('File error');
      const error = handleFileError(fileError);

      expect(error.type).toBe('FILE_ERROR');
      expect(error.message).toContain('ファイル処理中');
    });
  });

  describe("getDisplayMessage", () => {
    it("ネットワークエラーの表示メッセージを返す", () => {
      const error: AppError = {
        type: 'NETWORK_ERROR',
        message: 'Network error',
        timestamp: new Date()
      };

      expect(getDisplayMessage(error)).toBe('インターネット接続を確認してください。');
    });

    it("APIエラーの表示メッセージを返す", () => {
      const error: AppError = {
        type: 'API_ERROR',
        message: 'API error',
        timestamp: new Date()
      };

      expect(getDisplayMessage(error)).toBe('サーバーとの通信中にエラーが発生しました。しばらく待ってから再試行してください。');
    });

    it("バリデーションエラーはそのまま表示する", () => {
      const error: AppError = {
        type: 'VALIDATION_ERROR',
        message: '入力値が不正です',
        timestamp: new Date()
      };

      expect(getDisplayMessage(error)).toBe('入力値が不正です');
    });

    it("不明なエラータイプのデフォルトメッセージを返す", () => {
      const error: AppError = {
        type: 'UNKNOWN_ERROR',
        message: 'Unknown error',
        timestamp: new Date()
      };

      expect(getDisplayMessage(error)).toBe('予期しないエラーが発生しました。サポートまでお問い合わせください。');
    });
  });

  describe("logError", () => {
    it("開発環境でエラーログを出力する", () => {
      // NODE_ENVを開発環境に設定
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true });

      const error: AppError = {
        type: 'API_ERROR',
        message: 'Test error',
        timestamp: new Date(),
        originalError: new Error('Original error')
      };

      logError(error);

      expect(mockConsoleGroup).toHaveBeenCalledWith('🚨 API_ERROR: Test error');
      expect(mockConsoleLog).toHaveBeenCalledWith('Time:', error.timestamp.toISOString());
      expect(mockConsoleError).toHaveBeenCalledWith('Original Error:', error.originalError);
      expect(mockConsoleGroupEnd).toHaveBeenCalled();

      // 環境変数を復元
      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true });
    });

    it("本番環境ではログを出力しない", () => {
      const originalEnv = process.env.NODE_ENV;
      Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true });

      const error: AppError = {
        type: 'API_ERROR',
        message: 'Test error',
        timestamp: new Date()
      };

      logError(error);

      expect(mockConsoleGroup).not.toHaveBeenCalled();
      expect(mockConsoleLog).not.toHaveBeenCalled();
      expect(mockConsoleError).not.toHaveBeenCalled();
      expect(mockConsoleGroupEnd).not.toHaveBeenCalled();

      Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true });
    });
  });
});