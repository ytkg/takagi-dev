import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

describe('ProductCard component', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product.',
    imageUrl: 'https://placehold.jp/300x200.png?text=Test+Product',
  };

  it('renders all product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    // Check for the product name
    const nameElement = screen.getByText(mockProduct.name);
    expect(nameElement).toBeInTheDocument();

    // Check for the description
    const descriptionElement = screen.getByText(mockProduct.description);
    expect(descriptionElement).toBeInTheDocument();

    // Check for the image
    const imageElement = screen.getByRole('img', { name: mockProduct.name });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProduct.imageUrl);
  });
});
