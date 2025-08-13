import { render, screen } from '@testing-library/react';
import About from './About';

describe('About page', () => {
  it('renders the ASCII art', () => {
    render(<About />);

    const asciiArt = screen.getByText(/takagi@ytkg\.jp/);
    expect(asciiArt).toBeInTheDocument();
    expect(asciiArt.tagName).toBe('PRE');
  });
});
