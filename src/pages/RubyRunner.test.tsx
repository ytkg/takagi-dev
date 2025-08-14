import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RubyRunner from './RubyRunner';

describe('RubyRunner', () => {
  let mockVm: { eval: (code: string) => Promise<void>; print: (stream: 'stdout' | 'stderr', message: string) => void; };
  let mockRubyWASM: RubyWASM;

  beforeEach(() => {
    // Reset mocks before each test
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

    // Assign the mock to the window object
    window.RubyWASM = mockRubyWASM;

    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      } as Response)
    );
  });

  it('should render the component correctly and initialize the VM', async () => {
    render(<RubyRunner />);

    // Manually dispatch the event to trigger initialization
    window.dispatchEvent(new Event('ruby-wasm-loaded'));

    expect(screen.getByText('Ruby Runner')).toBeInTheDocument();
    expect(screen.getByText('Code Input')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();

    // Button is disabled during initialization
    const button = screen.getByRole('button', { name: /initializing/i });
    expect(button).toBeDisabled();

    // After successful initialization, button is enabled and text changes to "Run"
    await waitFor(() => {
        const runButton = screen.getByRole('button', { name: /run/i });
        expect(runButton).toBeEnabled();
        expect(screen.getByText('Ruby VM is ready. Click "Run" to execute code.')).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue('puts "Hello, World!"')).toBeInTheDocument();
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

    // The component re-assigns the print function on the vm object.
    // We need to capture that new function and call it to simulate output.
    await waitFor(() => {
        expect(mockVm.eval).toHaveBeenCalledWith(testCode);
    });

    // The component's `runCode` function overrides `vm.print`.
    // The `eval` mock calls the *original* mock `print` function, which does nothing.
    // This is a classic problem with mocking.
    // Let's adjust the test to check the final output in the DOM,
    // which is the most important user-facing result.
    // To do this, we need to make our mock `eval` call the *currently assigned* print function.

    // A better way is to make the mock `eval` aware of the reassignment.
    // Let's change the mock implementation to be more robust.
    mockVm.eval = vi.fn().mockImplementation(async () => {
        // In the component, vm.print is reassigned. So we call the *current* vm.print
        mockVm.print('stdout', 'Hello from test');
    });

    fireEvent.click(runButton);

    await waitFor(() => {
        const outputElement = screen.getByRole('code');
        expect(outputElement.textContent).toBe('Hello from test');
    });
  });

  it('should display an error and keep button disabled if VM fails to initialize', async () => {
    // Make the mock VM initializer reject
    mockRubyWASM.DefaultRubyVM = vi.fn().mockRejectedValue(new Error('WASM Load Error'));

    render(<RubyRunner />);
    window.dispatchEvent(new Event('ruby-wasm-loaded'));

    // Wait for the error message to be displayed
    await waitFor(() => {
        expect(screen.getByText(/error: failed to initialize ruby vm/i)).toBeInTheDocument();
        expect(screen.getByText(/wasm load error/i)).toBeInTheDocument();
    });

    // The button should now say "Run" but be disabled
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
