import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { products } from '../data/products';
import type { Product } from '../types';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (product: Product) => {
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
            onClick={() => handleCardClick(product)}
          />
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedProduct && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
            <div className="flex space-x-4">
              <a
                href={selectedProduct.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              >
                Visit Site
              </a>
              {selectedProduct.repoUrl && (
                <a
                  href={selectedProduct.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  View Repository
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
