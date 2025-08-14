import { render, screen, fireEvent } from '@testing-library/react';
import JsonFormatter from './JsonFormatter';
import '@testing-library/jest-dom';

describe('JsonFormatter', () => {
  test('renders the component', () => {
    render(<JsonFormatter />);
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Paste your JSON here...')).toBeInTheDocument();
    expect(screen.getByText('Format JSON')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  test('formats valid JSON correctly', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByPlaceholderText('Paste your JSON here...');
    const formatButton = screen.getByText('Format JSON');

    const unformattedJson = '{"key": "value", "number": 123}';
    const formattedJson = JSON.stringify(JSON.parse(unformattedJson), null, 2);

    fireEvent.change(inputArea, { target: { value: unformattedJson } });
    fireEvent.click(formatButton);

    const outputCode = screen.getByRole('code');
    expect(outputCode.textContent).toBe(formattedJson);
    expect(screen.queryByText(/Invalid JSON format/)).not.toBeInTheDocument();
  });

  test('shows an error for invalid JSON', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByPlaceholderText('Paste your JSON here...');
    const formatButton = screen.getByText('Format JSON');

    const invalidJson = '{"key": "value",';

    fireEvent.change(inputArea, { target: { value: invalidJson } });
    fireEvent.click(formatButton);

    expect(screen.getByText('Invalid JSON format. Please check your input.')).toBeInTheDocument();
  });

  test('clears input, output, and error when clear button is clicked', () => {
    render(<JsonFormatter />);
    const inputArea = screen.getByPlaceholderText('Paste your JSON here...') as HTMLTextAreaElement;
    const formatButton = screen.getByText('Format JSON');
    const clearButton = screen.getByText('Clear');

    // First, create a state with some data
    fireEvent.change(inputArea, { target: { value: '{"a":1}' } });
    fireEvent.click(formatButton);

    // Then, create an error state
    fireEvent.change(inputArea, { target: { value: 'invalid' } });
    fireEvent.click(formatButton);
    expect(screen.getByText('Invalid JSON format. Please check your input.')).toBeInTheDocument();


    // Now, click clear
    fireEvent.click(clearButton);

    // Assert that everything is cleared
    expect(inputArea.value).toBe('');
    expect(screen.queryByText(/Invalid JSON format/)).not.toBeInTheDocument();
    const outputCode = screen.getByRole('code');
    expect(outputCode.textContent).toBe('');
  });
});
