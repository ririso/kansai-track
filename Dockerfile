# ベースイメージとして Node.js を使用
FROM node:18-alpine

# 作業ディレクトリを作成
WORKDIR /app

# ローカルのパッケージ情報をコンテナにコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# ビルド
RUN npm run build

# ポート3000番を開放
EXPOSE 3000

# コンテナ起動時に実行するコマンド
CMD ["npm", "start"]
