# AGENTS.md

This document contains notes and instructions for AI agents working on this codebase.

## Project Overview

This is a web application built with the following technologies:

*   **Framework/Tooling:** React, TypeScript, Vite
*   **Routing:** `react-router-dom`
*   **Styling:** Tailwind CSS
*   **Linting:** ESLint

### Design Spec

- `DESIGN.md` はこのプロジェクトのUI/機能仕様書（Source of Truth）です。実装時は `DESIGN.md` を優先し、仕様変更がある場合は必ず同ファイルを更新してください。

## Project Structure

The codebase is organized as follows:

*   `src/main.tsx`: The main entry point for the application.
*   `src/App.tsx`: The root component that sets up the application's routing.
*   `src/pages/`: This directory contains the main page components of the application (e.g., `Home.tsx`, `About.tsx`, `Bookmarks.tsx`).
*   `src/components/`: This directory holds reusable components used across different pages (e.g., `Navbar.tsx`, `Footer.tsx`).
    * `BookmarkCard.tsx`: Bookmarksページ用のカードコンポーネント。
*   `src/data/`: アプリ内で利用するデータ群。
    * `bookmarks.jsonl`: Bookmarks用のJSONLデータ（1行=1レコード）。
*   `public/`: Static assets that are served directly.
*   `assets/`: Assets that are processed by Vite.

## Development Scripts

The following scripts are available in `package.json`:

*   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles the TypeScript code and builds the application for production.
*   `npm run lint`: Runs the ESLint linter to check for code quality issues.
*   `npm run preview`: Starts a local server to preview the production build.

### SEO Notes

- Sitemaps/robots: 生成は `vite-plugin-sitemap` に統一（ビルド時に `dist/` へ出力）。
- Base URL: コードに固定（`https://takagi.dev`）。変更時は `vite.config.ts` の `siteUrl` と `src/components/SEO.tsx` の `SITE_URL` を編集。
- ルート検出: `src/App.tsx` の `<Route path="..." />` から自動抽出（手動追記不要）。
- 動的追加/除外: 環境変数 `SITEMAP_EXTRA_PATHS` で追加、`SITEMAP_EXCLUDE_PATHS` で除外（カンマ区切り、任意）。
- 注意: `public/` 配下に `robots.txt`/`sitemap.xml` を置かない（二重管理回避）。

### Bookmarks Notes

- ページ: `src/pages/Bookmarks.tsx`（ルート: `/bookmarks`）。
- データ: `src/data/bookmarks.jsonl` に JSON Lines 形式で管理（1 行 = 1 レコード）。
  - スキーマ: `{ "url": string, "title": string, "tags": string[], "image"?: string }`（`image` は任意。カード上部のアイキャッチに使用）
  - 例:
    - `{ "url": "https://example.com", "title": "Example Domain", "tags": ["reference", "example"] }`
  - タグ未設定時の扱い: `tags` が未定義/空（空配列・空文字のみ）なら内部的に `other`（小文字）を付与。タグチップ一覧では `other` を常に末尾に並べる（実装は `src/utils/bookmarks.ts` の `parseJsonl` とタグ配列のソート）
- 取り込み: Vite の `?raw` インポートで文字列として読み込み、行単位で `JSON.parse`（パーサは `src/utils/bookmarks.ts`）。
- UI: 検索（タイトル/URL 部分一致, case-insensitive）とタグチップでのフィルタ（OR 条件）。`Clear` で検索/タグをリセット。
- 追加作業のヒント:
  - エントリ追加は `bookmarks.jsonl` に追記（並び順で表示）。
  - スキーマ拡張時はパーサ（`Bookmarks.tsx` 内 `parseJsonl`）と表示を同期。テスト（`src/pages/Bookmarks.test.tsx`）も更新。
  - サイトマップは `src/App.tsx` の `<Route path="/bookmarks" />` から自動検出されるため追記不要。

## Task Execution Procedure

Here is a typical workflow for completing a task in this repository.

1.  **Install Dependencies:**
    If this is your first time working on the project, or if dependencies have changed, install the necessary Node.js modules.
    ```bash
    npm install
    ```

2.  **Start the Development Server:**
    To see your changes in real-time, start the Vite development server.
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173`.

3.  **Implement Changes:**
    *   Locate the relevant files for your task, likely within the `src` directory.
    *   Pages are located in `src/pages`.
    *   Reusable components are in `src/components`.
    *   Make the required code modifications.
    *   **Important:** If you add a new tool, remember to update the "Available Tools" list at the end of this document.

4.  **Lint and Test:**
    Before finalizing your changes, ensure your code adheres to the project's style guidelines and that all tests pass.
    ```bash
    npm run lint
    npm test
    ```
    Fix any errors or warnings reported by the linter and ensure all tests pass.

    **Important:** When adding new features (e.g., new components, new logic), you **must** add corresponding tests to validate their functionality.

5.  **Verify Production Build (Optional):**
    It's a good practice to confirm that the application builds successfully for production.
    ```bash
    npm run build
    npm run preview
    ```

6.  **Review `AGENTS.md` / `DESIGN.md`:**
    Consider if your changes require updates to these documents. For example, if you add a new dependency, a new build step, change the project structure, or modify specifications/UX. If so, please update the corresponding file(s) accordingly (仕様は `DESIGN.md` に反映)。

7.  **Submit Your Work:**
    Once you are confident in your changes:
    a. Use the `request_code_review()` tool to get feedback on your work.
    b. Address any suggested changes.
    c. Use the `submit()` tool to commit your changes with a clear, descriptive message.

## Available Tools

To avoid proposing tools that already exist, please check the following list of currently implemented tools before starting your work.

*   JSON Formatter
*   Base64 Converter
*   Character Counter
*   QR Code Generator
*   Unix Timestamp Converter
