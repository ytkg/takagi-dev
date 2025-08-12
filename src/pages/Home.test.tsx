import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);

    const headingElement = screen.getByRole('heading', { name: /hello world/i });
    expect(headingElement).toBeInTheDocument();
  });
});
