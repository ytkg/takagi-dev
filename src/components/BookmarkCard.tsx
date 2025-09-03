type Bookmark = {
  url: string;
  title: string;
  tags: string[];
};

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 truncate">{bookmark.title}</h3>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline truncate"
          onClick={(e) => e.stopPropagation()}
        >
          {bookmark.url}
        </a>
      </div>
      <div className="p-6 pt-0">
        {bookmark.tags && bookmark.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {bookmark.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-md text-gray-700">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
