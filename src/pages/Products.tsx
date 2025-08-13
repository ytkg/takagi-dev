import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Products() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black text-center mb-12">Our Products</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
