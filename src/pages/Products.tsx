import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { products } from '../data/products';
import type { Product } from '../types';

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
      <h1 className="text-2xl font-bold mb-8">Products</h1>
      <div className="flex flex-wrap justify-start gap-8">
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
            <p className="text-sm text-gray-500 mb-4 break-all">{selectedProduct.siteUrl}</p>
            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

            <div className="mb-6">
              <a
                href={selectedProduct.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Visit Site
              </a>
            </div>

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
