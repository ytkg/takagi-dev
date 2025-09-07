type Bookmark = {
  url: string;
  title: string;
  tags: string[];
  image?: string;
};

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const FALLBACK = '/no-image.svg';
  const displayTags = (bookmark.tags || []).reduce<string[]>(
    (acc, t) => (t === 'other' ? acc : [...acc, t]),
    [],
  );
  if (bookmark.tags?.includes('other')) displayTags.push('other');
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
      <img
        src={bookmark.image || FALLBACK}
        alt={bookmark.title}
        className="w-full h-40 object-cover bg-gray-100"
        loading="lazy"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (img.src !== window.location.origin + FALLBACK && !img.src.endsWith(FALLBACK)) {
            img.src = FALLBACK;
          }
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 break-words">{bookmark.title}</h3>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-sm text-blue-600 hover:underline truncate"
          title={bookmark.url}
          onClick={(e) => e.stopPropagation()}
        >
          {bookmark.url}
        </a>
      </div>
      <div className="p-6 pt-0">
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
