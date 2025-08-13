import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-80 flex-shrink-0">
      <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
