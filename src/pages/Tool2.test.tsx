import { render, screen } from '@testing-library/react';
import Tool2 from './Tool2';

describe('Tool2 page', () => {
  it('renders the main heading', () => {
    render(<Tool2 />);

    const headingElement = screen.getByRole('heading', { name: /Tool 2/i });
    expect(headingElement).toBeInTheDocument();
  });
});
