import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ProductCard from './ProductCard';
import type { Product } from '../types';

describe('ProductCard component', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product.',
    siteUrl: 'https://example.com/test-product',
  };

  it('renders product information correctly', () => {
    const handleClick = vi.fn();
    render(<ProductCard product={mockProduct} onClick={handleClick} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<ProductCard product={mockProduct} onClick={handleClick} />);

    const cardElement = screen.getByText(mockProduct.name).parentElement?.parentElement;
    if (cardElement) {
      fireEvent.click(cardElement);
    }

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
