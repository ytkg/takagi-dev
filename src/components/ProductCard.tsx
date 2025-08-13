import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-80 flex flex-col cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={onClick}
    >
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
