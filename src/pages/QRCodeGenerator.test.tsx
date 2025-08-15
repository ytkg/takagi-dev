import { render, screen, fireEvent } from '@testing-library/react';
import QRCodeGenerator from './QRCodeGenerator';
import '@testing-library/jest-dom';

describe('QRCodeGenerator', () => {
  test('renders the component', () => {
    render(<QRCodeGenerator />);
    expect(screen.getByText('QR Code Generator')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text or URL to generate QR code...')).toBeInTheDocument();
  });

  test('does not display a QR code initially', () => {
    render(<QRCodeGenerator />);
    const outputDiv = screen.getByTestId('qr-code-output');
    expect(outputDiv.querySelector('svg')).not.toBeInTheDocument();
    expect(screen.getByText('QR code will appear here')).toBeInTheDocument();
  });

  test('displays a QR code when text is entered', async () => {
    render(<QRCodeGenerator />);
    const inputArea = screen.getByPlaceholderText('Enter text or URL to generate QR code...');
    fireEvent.change(inputArea, { target: { value: 'Hello World' } });

    const outputDiv = await screen.findByTestId('qr-code-output');
    const qrCodeSvg = outputDiv.querySelector('svg');
    expect(qrCodeSvg).toBeInTheDocument();
    expect(screen.queryByText('QR code will appear here')).not.toBeInTheDocument();
  });

  test('clears the input and QR code when clear button is clicked', async () => {
    render(<QRCodeGenerator />);
    const inputArea = screen.getByPlaceholderText('Enter text or URL to generate QR code...');
    const clearButton = screen.getByText('Clear');
    const outputDiv = screen.getByTestId('qr-code-output');

    // Enter text and verify QR code appears
    fireEvent.change(inputArea, { target: { value: 'Test' } });
    const qrCodeSvg = await screen.findByTestId('qr-code-output').then(div => div.querySelector('svg'));
    expect(qrCodeSvg).toBeInTheDocument();
    expect(inputArea).toHaveValue('Test');

    // Click clear and verify everything is reset
    fireEvent.click(clearButton);
    expect(inputArea).toHaveValue('');
    expect(outputDiv.querySelector('svg')).not.toBeInTheDocument();
    expect(screen.getByText('QR code will appear here')).toBeInTheDocument();
  });

  test('matches the snapshot', () => {
    const { container } = render(<QRCodeGenerator />);
    expect(container).toMatchSnapshot();
  });
});
