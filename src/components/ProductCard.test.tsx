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

  it('renders product name and a clickable site URL', () => {
    render(<ProductCard product={mockProduct} onDetailsClick={() => {}} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    const siteLink = screen.getByRole('link', { name: mockProduct.siteUrl });
    expect(siteLink).toBeInTheDocument();
    expect(siteLink).toHaveAttribute('href', mockProduct.siteUrl);
  });

  it('calls onDetailsClick when the "Details" button is clicked', () => {
    const handleDetailsClick = vi.fn();
    render(<ProductCard product={mockProduct} onDetailsClick={handleDetailsClick} />);

    const detailsButton = screen.getByRole('button', { name: 'Details' });
    fireEvent.click(detailsButton);

    expect(handleDetailsClick).toHaveBeenCalledTimes(1);
  });
});
