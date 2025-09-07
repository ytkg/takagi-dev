import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { products } from '../data/products';
import type { Product } from '../types';
import SEO from '../components/SEO';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetailsClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-8">
      <SEO
        title="Products | takagi.dev"
        description="List of products with overviews and links."
        path="/products"
      />
      <h1 className="text-2xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailsClick={() => handleDetailsClick(product)}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedProduct && (
          <div>
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <a
              href={selectedProduct.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline mb-4 break-all block"
            >
              {selectedProduct.siteUrl}
            </a>
            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

            {selectedProduct.repoUrls && selectedProduct.repoUrls.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Repositories:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedProduct.repoUrls.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
