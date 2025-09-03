import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Bookmarks from './Bookmarks';

const RAW = [
  { url: 'https://example.com', title: 'Example Domain', tags: ['reference', 'example'] },
  { url: 'https://react.dev/', title: 'React', tags: ['react', 'frontend'] },
  { url: 'https://vitejs.dev/', title: 'Vite', tags: ['build', 'tooling', 'frontend'] },
]
  .map((o) => JSON.stringify(o))
  .join('\n');

describe('Bookmarks page', () => {
  it('renders heading', () => {
    render(<Bookmarks rawData={RAW} />);
    expect(screen.getByRole('heading', { name: 'Bookmarks' })).toBeInTheDocument();
  });

  it('renders some bookmark items from JSONL', () => {
    render(<Bookmarks rawData={RAW} />);
    // One of the dummy entries
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('filters by search query (title/url)', async () => {
    const user = userEvent.setup();
    render(<Bookmarks rawData={RAW} />);
    const input = screen.getByRole('textbox', { name: 'Search bookmarks' });
    await user.type(input, 'React');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Vite')).not.toBeInTheDocument();
  });

  it('filters by tag chip (OR semantics)', async () => {
    const user = userEvent.setup();
    render(<Bookmarks rawData={RAW} />);
    const reactChip = screen.getByRole('button', { name: '#react' });
    await user.click(reactChip);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Vite')).not.toBeInTheDocument();
  });
});
