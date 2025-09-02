# takagi.dev

個人サイトおよびユーティリティツール集のフロントエンドです。React + TypeScript + Vite をベースに、`react-router-dom` と Tailwind CSS で構築しています。

## 技術スタック

- フレームワーク/ツール: React, TypeScript, Vite
- ルーティング: `react-router-dom`
- スタイリング: Tailwind CSS
- テスト: Vitest + Testing Library (JSDOM)
- リント: ESLint

## 主な機能

- ページ: Home, About, Products
- ツール:
  - JSON Formatter
  - Base64 Converter
  - Character & Word Counter
  - QR Code Generator
  - Unix Timestamp Converter

## 動作要件

- Node.js 18 以上
- npm (または互換のパッケージマネージャ)

## セットアップ

```bash
npm install
```

## 開発サーバー

```bash
npm run dev
```

デフォルトで `http://localhost:5173` で起動します（Vite）。

## スクリプト

- `npm run dev`: 開発サーバーを起動（HMR対応）
- `npm run build`: 本番ビルドを生成（`dist/`）
- `npm run preview`: 本番ビルドをローカルでプレビュー
- `npm run lint`: ESLint による静的解析
- `npm test`: Vitest を実行
- `npm run test:ui`: Vitest UI を起動

## テスト

Vitest + Testing Library を使用しています。JSDOM 環境でのコンポーネントテストとスナップショットテストが含まれます。

```bash
# CLI で実行
npm test

# UI で実行
npm run test:ui
```

## プロジェクト構成（抜粋）

- `src/main.tsx`: エントリポイント
- `src/App.tsx`: ルーティング定義
- `src/pages/`: 各ページ・ツール
- `src/components/`: 共通コンポーネント
- `src/data/`: 画面表示用の静的データ
- `public/`: 静的アセット
- `dist/`: 本番ビルド出力（`npm run build` 後に生成）

## デプロイ（任意）

Cloudflare Workers の Static Assets 構成（`wrangler.toml`）が同梱されています。

```bash
npm run build
# 事前に Wrangler のセットアップとログインが必要です
wrangler deploy
```

SPA ルーティングのため、`[assets] not_found_handling = "single-page-application"` を設定しています。

## 備考

- コードスタイルは ESLint に準拠しています。コミット前に `npm run lint` を推奨します。
- 新しいツールを追加した場合は、`AGENTS.md` の「Available Tools」リストの更新も忘れずに行ってください。
