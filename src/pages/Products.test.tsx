import { render, screen, fireEvent, within } from '@testing-library/react';
import Products from './Products';
import { products } from '../data/products';

describe('Products page', () => {
  beforeEach(() => {
    render(<Products />);
  });

  it('renders the main heading', () => {
    expect(screen.getByRole('heading', { name: /products/i, level: 1 })).toBeInTheDocument();
  });

  it('renders a card for each product', () => {
    expect(screen.getByText(products[0].name)).toBeInTheDocument();
    expect(screen.getByText(products[products.length - 1].name)).toBeInTheDocument();
  });

  it('opens the modal with correct content when a product card is clicked', () => {
    const firstProductCard = screen.getByText(products[0].name);
    fireEvent.click(firstProductCard);

    // Get the modal by its test id
    const modal = screen.getByTestId('modal-content');
    expect(modal).toBeInTheDocument();

    // Check for content *within* the modal to avoid ambiguity
    const modalTitle = within(modal).getByRole('heading', { name: products[0].name, level: 2 });
    expect(modalTitle).toBeInTheDocument();

    expect(within(modal).getByText(products[0].description)).toBeInTheDocument();
    expect(within(modal).getByRole('link', { name: 'Visit Site' })).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', () => {
    const firstProductCard = screen.getByText(products[0].name);
    fireEvent.click(firstProductCard);

    const modal = screen.getByTestId('modal-content');
    expect(modal).toBeInTheDocument();

    // The close button is the only button inside the modal
    const closeButton = within(modal).getByRole('button');
    fireEvent.click(closeButton);

    // The modal should no longer be in the document
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });
});
