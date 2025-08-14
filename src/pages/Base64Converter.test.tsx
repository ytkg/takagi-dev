import { render, screen, fireEvent } from '@testing-library/react';
import Base64Converter from './Base64Converter';
import '@testing-library/jest-dom';

describe('Base64Converter', () => {
  test('renders the component', () => {
    render(<Base64Converter />);
    expect(screen.getByText('Base64 Encoder / Decoder')).toBeInTheDocument();
  });

  test('encodes the input string correctly', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByPlaceholderText('Enter string to encode/decode...');
    fireEvent.change(inputArea, { target: { value: 'hello world' } });
    fireEvent.click(screen.getByText('Encode'));
    expect(screen.getByText('aGVsbG8gd29ybGQ=')).toBeInTheDocument();
  });

  test('decodes the input string correctly', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByPlaceholderText('Enter string to encode/decode...');
    fireEvent.change(inputArea, { target: { value: 'aGVsbG8gd29ybGQ=' } });
    fireEvent.click(screen.getByText('Decode'));
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  test('shows an error for invalid base64 string on decode', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByPlaceholderText('Enter string to encode/decode...');
    fireEvent.change(inputArea, { target: { value: 'invalid-base64' } });
    fireEvent.click(screen.getByText('Decode'));
    expect(screen.getByText('Invalid Base64 string. Please check your input.')).toBeInTheDocument();
  });

  test('clears the input and output', () => {
    render(<Base64Converter />);
    const inputArea = screen.getByPlaceholderText('Enter string to encode/decode...');
    fireEvent.change(inputArea, { target: { value: 'hello' } });
    fireEvent.click(screen.getByText('Encode'));
    expect(screen.getByText('aGVsbG8=')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Clear'));
    expect(screen.queryByText('aGVsbG8=')).not.toBeInTheDocument();
    expect(inputArea).toHaveValue('');
  });
});
