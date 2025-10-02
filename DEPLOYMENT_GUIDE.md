# 自動デプロイガイド

## 概要

このドキュメントでは、kansai-trackプロジェクトの自動デプロイ方法について説明します。

## 推奨デプロイ方法

### 1. Vercel (推奨)

Next.jsプロジェクトに最適化されたプラットフォームです。

#### 手動セットアップ
1. [Vercel](https://vercel.com)にアカウント作成
2. GitHubリポジトリと連携
3. プロジェクトをインポート
4. 自動的にビルド・デプロイが開始

#### GitHub Actions使用
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### 2. Netlify

#### 手動セットアップ
1. [Netlify](https://netlify.com)にアカウント作成
2. GitHubリポジトリと連携
3. ビルド設定:
   - Build command: `npm run build`
   - Publish directory: `out` (静的エクスポートの場合)

#### GitHub Actions使用
```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=.next
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

### 3. AWS S3 + CloudFront

静的サイトとしてデプロイする場合。

#### 前提条件
- Next.jsの静的エクスポート設定
- AWS CLIの設定

#### next.config.jsの設定
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

#### GitHub Actions設定
```yaml
name: Deploy to AWS S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-1
      - run: aws s3 sync out/ s3://${{ secrets.S3_BUCKET_NAME }} --delete
      - run: aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

### 4. Azure Static Web Apps

#### GitHub Actions設定
```yaml
name: Deploy to Azure Static Web Apps

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: 'upload'
          app_location: '.'
          api_location: ''
          output_location: '.next'
```

## 環境変数の設定

各プラットフォームで必要な環境変数：

### Vercel
- `VERCEL_TOKEN`: Vercelのアクセストークン
- `ORG_ID`: VercelのOrganization ID
- `PROJECT_ID`: VercelのProject ID

### Netlify
- `NETLIFY_SITE_ID`: NetlifyのSite ID
- `NETLIFY_AUTH_TOKEN`: Netlifyのアクセストークン

### AWS
- `AWS_ACCESS_KEY_ID`: AWSアクセスキーID
- `AWS_SECRET_ACCESS_KEY`: AWSシークレットアクセスキー
- `S3_BUCKET_NAME`: S3バケット名
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFrontディストリビューションID

### Azure
- `AZURE_STATIC_WEB_APPS_API_TOKEN`: Azure Static Web Appsのアクセストークン

## セキュリティ考慮事項

1. **シークレットの管理**: GitHubのSecrets機能を使用してアクセストークンを安全に管理
2. **IAMロール**: AWSの場合、最小権限の原則に基づいてIAMロールを設定
3. **HTTPS**: 全てのデプロイ先でHTTPSを有効化
4. **環境分離**: 本番環境と開発環境を分離

## トラブルシューティング

### よくある問題

1. **ビルドエラー**:
   - Node.jsバージョンの確認
   - 依存関係の更新
   - 環境変数の設定確認

2. **デプロイエラー**:
   - アクセストークンの有効性確認
   - リソース制限の確認
   - ログの詳細確認

3. **パフォーマンス問題**:
   - 画像最適化の設定
   - バンドルサイズの確認
   - CDNの設定確認

## 監視とアラート

デプロイ後の監視設定：

1. **アップタイム監視**: UptimeRobot、Pingdomなど
2. **パフォーマンス監視**: Lighthouse CI、Web Vitals
3. **エラー追跡**: Sentry、Bugsnagなど
4. **アナリティクス**: Google Analytics、Vercel Analytics

## まとめ

- **簡単さ重視**: Vercel
- **柔軟性重視**: Netlify
- **コスト重視**: AWS S3 + CloudFront
- **Microsoft環境**: Azure Static Web Apps

各プラットフォームの特徴を理解して、プロジェクトの要件に最適な方法を選択してください。