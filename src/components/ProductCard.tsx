import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onDetailsClick: () => void;
}

export default function ProductCard({ product, onDetailsClick }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 truncate">{product.name}</h3>
        <a
          href={product.siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline truncate"
          onClick={(e) => e.stopPropagation()} // Prevent card click from triggering if we ever add it back
        >
          {product.siteUrl}
        </a>
      </div>
      <div className="p-6 pt-0 flex justify-end">
        <button
          onClick={onDetailsClick}
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300 cursor-pointer"
        >
          Details
        </button>
      </div>
    </div>
  );
}
