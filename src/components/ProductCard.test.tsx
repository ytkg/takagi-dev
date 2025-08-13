import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import type { Product } from '../types';

describe('ProductCard component', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product.',
    siteUrl: 'https://example.com/test-product',
  };

  it('renders product information and a link button correctly', () => {
    render(<ProductCard product={mockProduct} />);

    // Check for the product name
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    // Check for the description
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    // Check for the link button
    const linkButton = screen.getByRole('link', { name: 'Visit Site' });
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveAttribute('href', mockProduct.siteUrl);
  });
});
