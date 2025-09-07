import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Bookmarks from './Bookmarks';

const RAW = [
  { url: 'https://example.com', title: 'Example Domain', tags: ['reference', 'example'] },
  { url: 'https://react.dev/', title: 'React', tags: ['react', 'frontend'] },
  { url: 'https://vitejs.dev/', title: 'Vite', tags: ['build', 'tooling', 'frontend'] },
  // タグ未設定エントリ（"other" として扱う）
  { url: 'https://no-tags.example.com', title: 'NoTag Site' },
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

  it('assigns "other" to entries without tags and filters by it', async () => {
    const user = userEvent.setup();
    render(<Bookmarks rawData={RAW} />);

    // Other チップが存在する
    const otherChip = screen.getByRole('button', { name: '#other' });
    expect(otherChip).toBeInTheDocument();

    // Other でフィルタするとタグ無しのエントリが表示され、他は隠れる
    await user.click(otherChip);
    expect(screen.getByText('NoTag Site')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.queryByText('Vite')).not.toBeInTheDocument();
  });

  it('places "other" as the last tag chip in the list', () => {
    render(<Bookmarks rawData={RAW} />);
    const allButtons = screen.getAllByRole('button');
    const chips = allButtons.filter((b) => b.textContent?.startsWith('#'));
    expect(chips.length).toBeGreaterThan(0);
    expect(chips[chips.length - 1]).toHaveTextContent('#other');
  });
});
