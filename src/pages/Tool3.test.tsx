import { render, screen } from '@testing-library/react';
import Tool3 from './Tool3';

describe('Tool3 page', () => {
  it('renders the main heading', () => {
    render(<Tool3 />);

    const headingElement = screen.getByRole('heading', { name: /Tool 3/i });
    expect(headingElement).toBeInTheDocument();
  });
});
