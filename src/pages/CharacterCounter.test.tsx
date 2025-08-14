import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCounter from './CharacterCounter';
import '@testing-library/jest-dom';

describe('CharacterCounter', () => {
  test('renders the component', () => {
    render(<CharacterCounter />);
    expect(screen.getByText('Character & Word Counter')).toBeInTheDocument();
  });

  test('initial counts are zero', () => {
    render(<CharacterCounter />);
    expect(screen.getByText('Characters')).toBeInTheDocument();
    expect(screen.getByText('Characters (no newlines)')).toBeInTheDocument();
    expect(screen.getByText('Words')).toBeInTheDocument();
    // All three counts should be 0 initially
    const initialCounts = screen.getAllByText('0');
    expect(initialCounts).toHaveLength(3);
  });

  test('updates counts on input without newlines', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(inputArea, { target: { value: 'Hello world' } });

    // Characters (with newlines): 'Hello world' -> 11
    // The 'Characters' heading is the parent of the count '11'
    const withNewlinesCount = screen.getByText('Characters').nextElementSibling;
    expect(withNewlinesCount).toHaveTextContent('11');

    // Characters (no newlines): 'Hello world' -> 11
    const withoutNewlinesCount = screen.getByText('Characters (no newlines)').nextElementSibling;
    expect(withoutNewlinesCount).toHaveTextContent('11');

    // Words: 'Hello world' -> 2
    const wordCount = screen.getByText('Words').nextElementSibling;
    expect(wordCount).toHaveTextContent('2');
  });

  test('updates counts on input with newlines', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(inputArea, { target: { value: 'Hello\nworld' } });

    // Characters (with newlines): 'Hello\nworld' -> 11
    const withNewlinesCount = screen.getByText('Characters').nextElementSibling;
    expect(withNewlinesCount).toHaveTextContent('11');

    // Characters (no newlines): 'Hello\nworld' -> 10
    const withoutNewlinesCount = screen.getByText('Characters (no newlines)').nextElementSibling;
    expect(withoutNewlinesCount).toHaveTextContent('10');

    // Words: 'Hello\nworld' -> 2
    const wordCount = screen.getByText('Words').nextElementSibling;
    expect(wordCount).toHaveTextContent('2');
  });

  test('clears the input when clear button is clicked', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(inputArea, { target: { value: 'Some text' } });

    // Check that counts are updated
    expect(screen.getByText('Characters').nextElementSibling).toHaveTextContent('9');
    expect(screen.getByText('Characters (no newlines)').nextElementSibling).toHaveTextContent('9');
    expect(screen.getByText('Words').nextElementSibling).toHaveTextContent('2');

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    // Check that input is cleared and counts are reset
    expect(inputArea).toHaveValue('');
    expect(screen.getAllByText('0').length).toBe(3);
  });

  test('matches the snapshot', () => {
    const { container } = render(<CharacterCounter />);
    expect(container).toMatchSnapshot();
  });
});
