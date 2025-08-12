import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the footer with copyright information', () => {
    render(<Footer />);

    const year = new Date().getFullYear();

    // Check for the full copyright text for larger screens
    const fullText = screen.getByText(`Copyright © ${year} takagi.dev All rights reserved.`);
    expect(fullText).toBeInTheDocument();

    // Check for the shorter copyright text for smaller screens
    const shortText = screen.getByText(`© ${year} takagi.dev`);
    expect(shortText).toBeInTheDocument();
  });
});
