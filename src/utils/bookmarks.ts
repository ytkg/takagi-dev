import type { Bookmark } from '../types'

/**
 * JSONL 文字列を `Bookmark[]` に変換するユーティリティ。
 * - 空行/不正行はスキップ
 * - `tags` が未定義/空（空配列・空文字のみ）の場合は [`other`] を付与
 * - `image` は空文字を除外
 */
export function parseJsonl(text: string): Bookmark[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        const obj = JSON.parse(line) as Partial<Bookmark> & Record<string, unknown>
        if (typeof obj.url !== 'string' || typeof obj.title !== 'string') return null

        const rawTags: unknown = (obj as Record<string, unknown>).tags
        const normalized = Array.isArray(rawTags)
          ? rawTags
              .map((t) => (typeof t === 'string' ? t.trim() : ''))
              .filter((t) => t.length > 0)
          : []
        const tags = normalized.length > 0 ? normalized : ['other']
        const image = typeof obj.image === 'string' && obj.image.trim() ? obj.image.trim() : undefined

        return { url: obj.url, title: obj.title, tags, image } satisfies Bookmark
      } catch {
        return null
      }
    })
    .filter((v): v is Bookmark => v !== null)
}

