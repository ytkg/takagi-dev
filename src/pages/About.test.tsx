import { render, screen } from '@testing-library/react';
import About from './About';

describe('About page', () => {
  it('renders the self-introduction SVG', () => {
    render(<About />);

    const svgImage = screen.getByAltText(/self-introduction ascii art/i);
    expect(svgImage).toBeInTheDocument();
    expect(svgImage).toHaveAttribute('src', '/ascii.svg');
  });
});
