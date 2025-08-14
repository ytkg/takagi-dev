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
    expect(screen.getByText('Characters (no newlines)')).toBeInTheDocument();
    expect(screen.getByText('Words')).toBeInTheDocument();
    // Both counts should be 0 initially
    const initialCounts = screen.getAllByText('0');
    expect(initialCounts).toHaveLength(2);
  });

  test('updates counts on input', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(inputArea, { target: { value: 'Hello world' } });

    // Characters: 'Hello world' -> 11
    expect(screen.getByText('11')).toBeInTheDocument();
    // Words: 'Hello world' -> 2
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('handles multiple spaces between words', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(inputArea, { target: { value: 'Hello    world' } });

    // Characters: 'Hello    world' -> 14
    expect(screen.getByText('14')).toBeInTheDocument();
    // Words: 'Hello    world' -> 2
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('handles leading/trailing spaces', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(inputArea, { target: { value: '  Hello world  ' } });

    // Characters: '  Hello world  ' -> 15
    expect(screen.getByText('15')).toBeInTheDocument();
    // Words: '  Hello world  ' -> 2
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('ignores newline characters in character count', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(inputArea, { target: { value: 'hello\nworld' } });

    // Characters: 'hello\nworld' -> length is 11, but without newline it's 10
    expect(screen.getByText('10')).toBeInTheDocument();
    // Words: 'hello\nworld' -> 2 words
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('clears the input when clear button is clicked', () => {
    render(<CharacterCounter />);
    const inputArea = screen.getByPlaceholderText('Enter text here...');
    fireEvent.change(inputArea, { target: { value: 'Some text' } });

    // Check that counts are updated
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);

    // Check that input is cleared and counts are reset
    expect(inputArea).toHaveValue('');
    // Both counts should be 0
    expect(screen.getAllByText('0').length).toBe(2);
  });

  test('matches the snapshot', () => {
    const { container } = render(<CharacterCounter />);
    expect(container).toMatchSnapshot();
  });
});
