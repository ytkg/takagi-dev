# DESIGN

## 共通仕様

- レイアウト骨組み
  - 全体: `<Navbar />` → `<main />` → `<Footer />` の縦並び。
  - 高さ: ルートは `flex flex-col min-h-[100dvh]`、メインは `flex-grow`。
  - ヘッダー: `h-16` で sticky、フッター: `h-12`。

- UI/インタラクション
  - リンク/ボタンは `rounded-md` を基本とし、`transition-colors` を原則適用。
  - ボタン配色: プライマリ（青）、セカンダリ（灰）、成功（緑）をページ用途に応じて使用。
  - PC でのホバー表現を優先。モバイルはホバー非適用。

- フォーム/入力系
  - 入力: `border rounded-md p-2`、背景は `bg-gray-50`、ダーク時は `dark:bg-gray-800 dark:text-white`。
  - テキストエリアはコード用に `font-mono text-sm` を使用。

- レスポンシブ
  - 主要ブレークポイントは `md` を基準に 1 → 2 カラムへ切替。
  - ナビゲーションは `md` 以上でデスクトップ、未満でモバイルドロワー。

- アクセシビリティ
  - ナビゲーション/モバイルドロワー/モーダルでは適切なロール/ARIA を付与（例: `role="navigation"`, `role="dialog"`, `aria-modal`, `aria-expanded`, `aria-label`）。
  - 外部リンクは `target="_blank"` の場合、`rel="noopener noreferrer"` を必ず付与。

- SEO
  - 全ページで `src/components/SEO.tsx` を用いて title/description/canonical/OG/Twitter を設定。
  - `SITE_URL` は固定ドメイン（`https://takagi.dev`）。必要に応じ JSON-LD を追加可能。

## ヘッダー

- 概要: 画面上部に固定されたナビゲーションバー。左にブランド、右にメニュー。
- レイアウト: sticky top-0 / z-50 / h-16 / bg-white / text-black / shadow / font-mono。

- 左側（ブランド）
  - 表示: 「takagi.dev」リンク（クリックで `/` へ遷移）
  - 余白/形状: `ml-4` + `p-4`、`rounded-md`
  - ホバー: 背景色 `bg-gray-100`、`transition-colors`

- 右側（PC, md 以上）
  - メニュー: Home / About / Products / Tools / GitHub（外部リンク）
  - 各リンク: `p-4`、`rounded-md`、ホバーで `bg-gray-100`（`transition-colors`）
  - Tools: ホバーでプルダウン表示。プルダウン内リンクはホバーで `bg-gray-100` + `text-gray-900`

- モバイル（md 未満）
  - 右側メニュー非表示、ハンバーガーで開閉
  - ドロワー: 右からスライド（`w-64` / `bg-gray-800` / `text-white`）
  - Tools はアコーディオンで展開
  - ホバー効果: 適用しない（タッチデバイス）

- アクセシビリティ
  - ナビゲーション: `role="navigation"`
  - モバイルドロワー: `role="dialog"` + `aria-modal` + `aria-label`
  - トグルボタン: `aria-label` / `aria-expanded`
  - 外部リンク: `rel="noopener noreferrer"` + `target="_blank"`

## トップページ

- 概要: 画面中央のヒーロー見出しと、下部固定のリポジトリ・スコーラーで構成。

- レイアウト
  - ビューポート全高: `h-[100dvh]`
  - 中央寄せ: `flex` + `justify-center` + `items-center`
  - 背景: `bg-white`
  - ヘッダー/フッター分の押し出しを相殺する余白調整あり

- ヒーロー見出し
  - 文言: 「Hello World!」
  - タイポグラフィ: `font-black`、ブレークポイントで拡大（例: `text-4xl` → `sm:text-6xl` → `md:text-7xl` → `lg:text-8xl`）

- SEO
  - タイトル: `takagi.dev | Developer tools and notes`
  - ディスクリプション: ツール概要（JSON/Base64/文字数/QR/Unix 時刻）
  - パス: `/`、OGP 画像: `/ogp.png`
  - Open Graph/Twitter/canonical を出力（`src/components/SEO.tsx`）

- リポジトリ・スコーラー（下部固定）
  - 位置: 画面下部に固定（左右いっぱい）。上下パディングあり
  - 表示内容: リポジトリカードの横並び。
  - スクロール: 横方向に自動スクロール。ホバーで一時停止
  - 無限ループ: リストを複製して連結し、途中で巻き戻して連続表示
  - スクロールバー: 非表示（`.no-scrollbar` ユーティリティ）
  - カード要素: リポジトリ名/説明/スター数/フォーク数/言語

- 実装メモ
  - 自動スクロールは `requestAnimationFrame` で 1px/フレーム加算、半分到達で先頭に戻す方式
  - ホバー時はスクロールを停止（マウス離脱で再開）

## About ページ

- 概要: プロフィール/連絡先をプレーンテキストの ASCII アートで表示。

- レイアウト
  - ビューポート全高: `h-[100dvh]`
  - 中央寄せ: `flex` + `justify-center` + `items-center`
  - 背景: `bg-white`
  - ヘッダー/フッター分の押し出しを相殺する余白調整あり

- コンテンツ
  - 中央に `<pre>` 要素で ASCII アートを表示（改行/スペースを保持）
  - 文言構成（概念図）:
    - 1行目: 「┌ me ┐ ┌ web ┐」のような枠付き表示（`web` は外部リンク）
    - 2行目: `takagi@ytkg.jp`（プレーンテキスト）
    - 3行目: 「│     └ x ┘  │」（`x` は外部リンク）
    - 4行目: 「└─── mail ───┘」（`mail` は `mailto:` リンク）
  - リンク:
    - `web`: `https://ytkg.jp`（`target="_blank"`、`rel="noreferrer"`）
    - `x`: `https://x.com/ytkg_`（`target="_blank"`、`rel="noreferrer"`）
    - `mail`: `mailto:takagi@ytkg.jp`

- タイポグラフィ
  - フォント: `font-mono`（等幅）
  - 文字サイズ（例）: `text-2xl` → `sm:text-3xl` → `md:text-4xl` → `lg:text-5xl`
  - 整列: `text-center`、行間: `leading-snug`

- SEO
  - タイトル: `About | takagi.dev`
  - ディスクリプション: `Site owner profile and links.`
  - パス: `/about`、OGP 画像: `/ogp.png`
  - Open Graph/Twitter/canonical を出力（`src/components/SEO.tsx`）

## Products ページ

- 概要: 製品一覧のカードグリッドと、詳細を表示するモーダルで構成。

- レイアウト
  - ページ余白: `p-8`
  - 見出し: `h1` に「Products」
  - カード一覧: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8`

- カード（`ProductCard`）
  - 枠: `bg-white` / `border` / `rounded-lg` / `shadow-md`
  - 本文: 製品名（太字・省略時は `truncate`）とサイト URL（外部リンク、`hover:underline`）
  - アクション: `Details` ボタン（`bg-gray-200`→`hover:bg-gray-300`、`rounded`）

- モーダル（`Modal`）
  - 表示: `Details` クリックで開く。背景は半透明のオーバーレイ、中央に `rounded-lg` の白いボックス
  - 閉じる: 背景クリック、または右上の×ボタン
  - コンテンツ: 製品名（`h2`）、サイト URL（外部リンク・下線）、説明文、任意でリポジトリリンク一覧（箇条書き）

- データ
  - `src/data/products.ts` から配列を読み込み。
  - 各要素: `id` / `name` / `description` / `siteUrl` / `repoUrls?`

- SEO
  - タイトル: `Products | takagi.dev`
  - ディスクリプション: `List of products with overviews and links.`
  - パス: `/products`、OGP 画像: `/ogp.png`
  - Open Graph/Twitter/canonical を出力（`src/components/SEO.tsx`）

## Tools: JSON Formatter

- 概要: JSON の整形/検証。入力→フォーマット→出力/エラー表示。

- レイアウト
  - ページ余白: `p-8`、見出し: `h1` に「JSON Formatter」
  - 2カラム: `md` 以上で入力/出力を左右配置（`grid`）

- 入力
  - テキストエリア: `placeholder="Paste your JSON here..."`
  - 操作: `Format JSON`、`Clear`

- 出力
  - 正常: 整形済み JSON を `<code>` で表示
  - 異常: `Invalid JSON format. Please check your input.` を赤字表示、出力は空

- ボタン
  - Format JSON: `JSON.parse`→`JSON.stringify(..., null, 2)` で整形
  - Clear: 入力/出力/エラーを空にリセット

- SEO
  - タイトル: `JSON Formatter | takagi.dev`
  - ディスクリプション: `Format, minify, and validate JSON online.`
  - パス: `/tools/json-formatter`、OGP 画像: `/ogp.png`

## Tools: Base64 Converter

- 概要: 文字列と Base64 の相互変換（UTF-8 対応）。

- レイアウト/入力
  - ページ余白: `p-8`、見出し: `h1` に「Base64 Encoder / Decoder」
  - テキストエリア: `placeholder="Enter string to encode/decode..."`

- 出力/エラー
  - エンコード/デコード結果を `<code>` で表示
  - 異常系（Decode）: `Invalid Base64 string. Please check your input.`

- ボタン
  - Encode: 入力を Base64 へ
  - Decode: 入力を Base64 から復号
  - Clear: 入力/出力/エラーをリセット

- SEO
  - タイトル: `Base64 Converter | takagi.dev`
  - ディスクリプション: `Encode and decode Base64 quickly online.`
  - パス: `/tools/base64-converter`、OGP 画像: `/ogp.png`

## Tools: Character & Word Counter

- 概要: 入力テキストの文字数（改行含む/含まない）と単語数をリアルタイム集計。

- レイアウト
  - ページ余白: `p-8`、見出し: `h1` に「Character & Word Counter」
  - テキストエリアの下に 3 つの集計カード（Characters / Characters (no newlines) / Words）

- カウント仕様
  - 改行含む: `input.length`
  - 改行除外: `input.replace(/\n/g, '').length`
  - 単語数: `trim` 後、空白区切りで配列化し `filter(Boolean).length`

- 操作
  - Clear: 入力を空にし、全カウントを 0 に戻す

- SEO
  - タイトル: `Character & Word Counter | takagi.dev`
  - ディスクリプション: `Count characters, words, and lines in real time.`
  - パス: `/tools/character-counter`、OGP 画像: `/ogp.png`

## Tools: QR Code Generator

- 概要: 入力テキスト/URL から QR コード生成。PNG 保存対応。

- レイアウト
  - ページ余白: `p-8`、見出し: `h1` に「QR Code Generator」
  - 入力/出力の 2 カラム（`md` 以上）

- 入力/出力
  - 入力: テキストエリア `placeholder="Enter text or URL to generate QR code..."`
  - 出力: 右側の枠（中央寄せ）。未入力時はプレースホルダー「QR code will appear here」
  - 入力ありで SVG の QR コードを表示（`react-qr-code`）

- ボタン
  - Clear: 入力と QR コードを消去。未入力時は非活性
  - Save Image: SVG→PNG に変換して `qrcode.png` をダウンロード。未入力時は非活性

- SEO
  - タイトル: `QR Code Generator | takagi.dev`
  - ディスクリプション: `Generate QR codes instantly from text or URLs.`
  - パス: `/tools/qr-code-generator`、OGP 画像: `/ogp.png`

## Tools: Unix Timestamp Converter

- 概要: Unix 時刻（秒）と UTC 日時の相互変換。現在時刻設定とコピー機能あり。

- レイアウト
  - ページ余白: `p-8`、見出し: `h1` に「Unix Timestamp Converter」
  - 左: タイムスタンプ入力と操作ボタン、エラー表示
  - 右: UTC の年月日時分秒入力（`input[type=number]`）とフォーマット済み文字列

- 入力/変換仕様
  - タイムスタンプを入力すると UTC 日時へ即時反映（不正値は `Invalid timestamp` を表示）
  - 右側の各フィールド編集で UTC 日時を更新し、左のタイムスタンプも同期
  - `Set to Now`: 現在の時刻を反映
  - `Copy`: クリップボードへタイムスタンプ文字列をコピー

- SEO
  - タイトル: `Unix Timestamp Converter | takagi.dev`
  - ディスクリプション: `Convert between Unix time and UTC datetime.`
  - パス: `/tools/unix-timestamp-converter`、OGP 画像: `/ogp.png`
