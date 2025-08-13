import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Products from './Products';
import { products } from '../data/products';

// Mock the ProductCard component to simplify the test
vi.mock('../components/ProductCard', () => ({
  default: ({ product }: { product: { name: string } }) => (
    <div data-testid="product-card">
      <h3>{product.name}</h3>
    </div>
  ),
}));

describe('Products page', () => {
  it('renders the main heading', () => {
    render(<Products />);
    const headingElement = screen.getByRole('heading', { name: /our products/i });
    expect(headingElement).toBeInTheDocument();
  });

  it('renders a card for each product', () => {
    render(<Products />);
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(products.length);
  });
});
