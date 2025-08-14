import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RubyRunner from './RubyRunner';

describe('RubyRunner', () => {
  let mockVm: { eval: (code: string) => Promise<void>; print: (stream: 'stdout' | 'stderr', message: string) => void; };
  let mockRubyWASM: RubyWASM;

  beforeEach(() => {
    vi.clearAllMocks();

    mockVm = {
      eval: vi.fn().mockImplementation(async (code: string) => {
        if (code.includes('Hello from test')) {
          mockVm.print('stdout', 'Hello from test');
        } else if (code.includes('error')) {
          throw new Error('Runtime error');
        }
      }),
      print: vi.fn(),
    };

    mockRubyWASM = {
      DefaultRubyVM: vi.fn().mockResolvedValue({ vm: mockVm }),
    };

    window.RubyWASM = mockRubyWASM;

    global.fetch = vi.fn(() =>
      Promise.resolve({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as Response)
    );
  });

  it('should render the component correctly and initialize the VM', async () => {
    render(<RubyRunner />);
    window.dispatchEvent(new Event('ruby-wasm-loaded'));

    expect(screen.getByText('Ruby Runner')).toBeInTheDocument();
    expect(screen.getByText('Code Input')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /initializing/i });
    expect(button).toBeDisabled();

    await waitFor(() => {
        const runButton = screen.getByRole('button', { name: /run/i });
        expect(runButton).toBeEnabled();
        expect(screen.getByText('Ruby VM is ready. Click "Run" to execute code.')).toBeInTheDocument();
    });

    expect(screen.getByRole('textbox', { name: /code editor/i })).toHaveValue('puts "Hello, World!"');
  });

  it('should run code and display output when the run button is clicked', async () => {
    render(<RubyRunner />);
    window.dispatchEvent(new Event('ruby-wasm-loaded'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /run/i })).toBeEnabled();
    });

    const runButton = screen.getByRole('button', { name: /run/i });
    const textarea = screen.getByRole('textbox', { name: /code editor/i });

    const testCode = 'puts "Hello from test"';
    fireEvent.change(textarea, { target: { value: testCode } });
    fireEvent.click(runButton);

    await waitFor(() => {
        expect(mockVm.eval).toHaveBeenCalledWith(testCode);
    });

    await waitFor(() => {
        // The output is inside a <code> tag
        const outputElement = screen.getByRole('code');
        expect(outputElement).toHaveTextContent('Hello from test');
    });
  });

  it('should display an error and keep button disabled if VM fails to initialize', async () => {
    mockRubyWASM.DefaultRubyVM = vi.fn().mockRejectedValue(new Error('WASM Load Error'));

    render(<RubyRunner />);
    window.dispatchEvent(new Event('ruby-wasm-loaded'));

    await waitFor(() => {
        expect(screen.getByText(/error: failed to initialize ruby vm/i)).toBeInTheDocument();
        expect(screen.getByText(/wasm load error/i)).toBeInTheDocument();
    });

    const runButton = screen.getByRole('button', { name: /run/i });
    expect(runButton).toBeDisabled();
  });

  it('should display an error if the code execution fails', async () => {
    mockVm.eval.mockRejectedValue(new Error('Syntax Error'));

    render(<RubyRunner />);
    window.dispatchEvent(new Event('ruby-wasm-loaded'));

    await waitFor(() => {
        expect(screen.getByRole('button', { name: /run/i })).toBeEnabled();
    });

    fireEvent.click(screen.getByRole('button', { name: /run/i }));

    await waitFor(() => {
        expect(screen.getByText(/error:/i)).toBeInTheDocument();
        expect(screen.getByText(/syntax error/i)).toBeInTheDocument();
    });
  });
});
