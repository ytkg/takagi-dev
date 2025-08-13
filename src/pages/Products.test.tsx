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

  it('opens the modal with correct content when "Details" button is clicked', () => {
    // Find the "Details" button associated with the first product and click it
    // We can find the card container and then the button within it.
    const firstProductCard = screen.getByText(products[0].name).closest('div.bg-white');
    const detailsButton = within(firstProductCard!).getByRole('button', { name: 'Details' });
    fireEvent.click(detailsButton);

    // Modal should now be open
    const modal = screen.getByTestId('modal-content');
    expect(modal).toBeInTheDocument();

    // Check for content *within* the modal
    expect(within(modal).getByRole('heading', { name: products[0].name, level: 2 })).toBeInTheDocument();
    expect(within(modal).getByText(products[0].siteUrl)).toBeInTheDocument();
    expect(within(modal).getByText(products[0].description)).toBeInTheDocument();
    expect(within(modal).getByRole('link', { name: 'Visit Site' })).toBeInTheDocument();

    // Check for repository links
    const repoLinks = within(modal).getAllByRole('link');
    // There should be a "Visit Site" link + two repo links for the first product
    expect(repoLinks).toHaveLength(3);
    expect(repoLinks[1]).toHaveTextContent(products[0].repoUrls![0]);
    expect(repoLinks[2]).toHaveTextContent(products[0].repoUrls![1]);
  });

  it('closes the modal when the close button is clicked', () => {
    const firstProductCard = screen.getByText(products[0].name).closest('div.bg-white');
    const detailsButton = within(firstProductCard!).getByRole('button', { name: 'Details' });
    fireEvent.click(detailsButton);

    const modal = screen.getByTestId('modal-content');
    expect(modal).toBeInTheDocument();

    const closeButton = within(modal).getByRole('button');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });
});
