import { render, screen } from '@testing-library/react';
import Tool1 from './Tool1';

describe('Tool1 page', () => {
  it('renders the main heading', () => {
    render(<Tool1 />);

    const headingElement = screen.getByRole('heading', { name: /Tool 1/i });
    expect(headingElement).toBeInTheDocument();
  });
});
