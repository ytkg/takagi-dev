import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Bookmarks from './Bookmarks';

describe('Bookmarks page', () => {
  it('renders heading', () => {
    render(<Bookmarks />);
    expect(screen.getByRole('heading', { name: 'Bookmarks' })).toBeInTheDocument();
  });

  it('renders some bookmark items from JSONL', () => {
    render(<Bookmarks />);
    // One of the dummy entries
    expect(screen.getByText('MDN Web Docs')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('filters by search query (title/url)', async () => {
    const user = userEvent.setup();
    render(<Bookmarks />);
    const input = screen.getByRole('textbox', { name: 'Search bookmarks' });
    await user.type(input, 'React');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('MDN Web Docs')).not.toBeInTheDocument();
  });

  it('filters by tag chip (OR semantics)', async () => {
    const user = userEvent.setup();
    render(<Bookmarks />);
    const webChip = screen.getByRole('button', { name: '#web' });
    await user.click(webChip);
    expect(screen.getByText('MDN Web Docs')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});
