import { useEffect } from 'react';

type SEOProps = {
  title: string;
  description?: string;
  /** ページの相対パス（例: "/about"）。省略時は現在の location.pathname を使用 */
  path?: string;
  /** og:type */
  type?: 'website' | 'article' | 'profile' | string;
  /** OGP/Twitter 用画像 URL */
  image?: string;
  /** 追加の構造化データ(JSON-LD) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

// 環境変数を使わず、固定ドメインを使用
const SITE_URL = 'https://takagi.dev';
const SITE_NAME = 'takagi.dev';

function upsertMetaByName(name: string, content: string) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  if (!content) return;
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  const id = 'app-jsonld';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(data);
}

export default function SEO({ title, description, path, type = 'website', image, jsonLd }: SEOProps) {
  useEffect(() => {
    // タイトル
    document.title = title;

    // URL と canonical
    const pathname = path ?? window.location.pathname;
    const url = new URL(pathname, SITE_URL).href;
    upsertLink('canonical', url);

    // Meta description
    if (description) upsertMetaByName('description', description);

    // Open Graph
    upsertMetaByProperty('og:site_name', SITE_NAME);
    upsertMetaByProperty('og:title', title);
    if (description) upsertMetaByProperty('og:description', description);
    upsertMetaByProperty('og:type', type);
    upsertMetaByProperty('og:url', url);
    if (image) upsertMetaByProperty('og:image', image);

    // Twitter
    upsertMetaByName('twitter:card', image ? 'summary_large_image' : 'summary');
    if (image) upsertMetaByName('twitter:image', image);

    // JSON-LD (任意)
    if (jsonLd) upsertJsonLd(jsonLd);
  }, [title, description, path, type, image, jsonLd]);

  return null;
}
