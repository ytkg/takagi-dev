/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

function extractRoutesFromApp(): string[] {
  try {
    const ts = readFileSync('src/App.tsx', 'utf8')
    // <Route path="/..." element=... /> を抽出
    const toRegex = /<Route\s+path=\{?['"]([^'"\n]+)['"]\}?/g
    const set = new Set<string>()
    let m: RegExpExecArray | null
    while ((m = toRegex.exec(ts))) {
      const p = m[1].trim()
      if (p.startsWith('/')) set.add(p)
    }
    const extra = (process.env.SITEMAP_EXTRA_PATHS || process.env.VITE_SITEMAP_EXTRA_PATHS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    for (const e of extra) if (e.startsWith('/')) set.add(e)
    const exclude = (process.env.SITEMAP_EXCLUDE_PATHS || process.env.VITE_SITEMAP_EXCLUDE_PATHS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    for (const ex of exclude) if (ex.startsWith('/')) set.delete(ex)
    // ensure root exists
    set.add('/')
    return [...set]
  } catch (_e) {
    return ['/']
  }
}

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins: any[] = [react()]

  // vite-plugin-sitemap を動的読み込み（未導入でもビルドを壊さない）
  try {
    const mod = await import('vite-plugin-sitemap')
    const sitemap = (mod as any).default || mod
    // 環境変数を使わず、固定ドメインを使用
    const siteUrl = 'https://takagi.dev'
    const routes = extractRoutesFromApp()
    const dynamicRoutes = routes.filter((p) => p !== '/')
    plugins.push(
      sitemap({
        hostname: siteUrl,
        dynamicRoutes,
        changefreq: 'monthly',
        readable: true,
        generateRobotsTxt: true,
      }),
    )
    // robots.txt の生成に対応する実装がある場合に備えてオプションを渡す（無視されても問題なし）
    // plugins.push(sitemap({ generateRobotsTxt: true }))
  } catch (_e) {
    console.warn('[vite] vite-plugin-sitemap が未インストールのため、サイトマップ生成をスキップします。')
  }

  return {
    plugins,
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  }
})
