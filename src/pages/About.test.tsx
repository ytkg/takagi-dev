import { render, screen } from '@testing-library/react';
import About from './About';

describe('About page', () => {
  it('renders the main heading', () => {
    render(<About />);

    const headingElement = screen.getByRole('heading', { name: /this is about page/i });
    expect(headingElement).toBeInTheDocument();
  });
});
