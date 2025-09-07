import SEO from '../components/SEO';
import raw from '../data/bookmarks.jsonl?raw';
import { useMemo, useState, useCallback } from 'react';
import BookmarkCard from '../components/BookmarkCard';

type Bookmark = {
  url: string;
  title: string;
  tags: string[];
  image?: string;
};

function parseJsonl(text: string): Bookmark[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        const obj = JSON.parse(line);
        const rawTags: unknown = obj.tags;
        const normalized = Array.isArray(rawTags)
          ? rawTags
              .map((t) => (typeof t === 'string' ? t.trim() : ''))
              .filter((t) => t.length > 0)
          : [];
        const tags = normalized.length > 0 ? normalized : ['other'];
        const image = typeof obj.image === 'string' && obj.image.trim() ? obj.image.trim() : undefined;
        return { url: obj.url, title: obj.title, tags, image } as Bookmark;
      } catch {
        return null;
      }
    })
    .filter((v): v is Bookmark => v !== null);
}

type BookmarksProps = { rawData?: string };

export default function Bookmarks({ rawData }: BookmarksProps = {}) {
  const source = rawData ?? raw;
  const bookmarks = useMemo(() => parseJsonl(source), [source]);
  const [query, setQuery] = useState('');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const s = new Set<string>();
    for (const b of bookmarks) {
      for (const t of b.tags || []) s.add(t);
    }
    return Array.from(s).sort((a, b) => {
      if (a === 'other' && b !== 'other') return 1; // other を最後へ
      if (b === 'other' && a !== 'other') return -1;
      return a.localeCompare(b);
    });
  }, [bookmarks]);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveTags(new Set());
    setQuery('');
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasQuery = q.length > 0;
    const hasTags = activeTags.size > 0;
    return bookmarks.filter((b) => {
      const qok = !hasQuery || b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q);
      const tok = !hasTags || b.tags?.some((t) => activeTags.has(t)); // OR 条件
      return qok && tok;
    });
  }, [bookmarks, query, activeTags]);

  return (
    <div className="p-8">
      <SEO
        title="Bookmarks | takagi.dev"
        description="Personal list of bookmarked sites."
        path="/bookmarks"
        image="/ogp.png"
      />

      <h1 className="text-2xl font-bold mb-6">Bookmarks</h1>

      {/* Controls */}
      <div className="mb-8 space-y-3">
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or URL"
            className="w-full md:w-[32rem] border rounded-md p-2 bg-gray-50"
            aria-label="Search bookmarks"
          />
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Tags:</span>
          {allTags.map((t) => {
            const selected = activeTags.has(t);
            return (
              <button
                key={t}
                type="button"
                className={`text-xs px-2 py-1 rounded-md border transition-colors ${selected ? 'bg-gray-800 text-white border-gray-800' : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200'}`}
                onClick={() => toggleTag(t)}
                aria-pressed={selected}
              >
                #{t}
              </button>
            );
          })}
          <button
            type="button"
            onClick={clearFilters}
            className="ml-1 text-xs px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300"
          >
            Clear
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No bookmarks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {filtered.map((b, idx) => (
            <BookmarkCard key={`${b.url}-${idx}`} bookmark={b} />
          ))}
        </div>
      )}
    </div>
  );
}
