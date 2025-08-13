import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RubyRunner from './RubyRunner';

// Mock the 'ruby-head-wasm-wasi' module
vi.mock('ruby-head-wasm-wasi', () => ({
  DefaultRubyVM: vi.fn(),
}));

// We need to import the mocked version after the vi.mock call
import * as RubyWASM from 'ruby-head-wasm-wasi';

describe('RubyRunner', () => {
  let mockVm: { eval: (code: string) => Promise<void>; print: (stream: 'stdout' | 'stderr', message: string) => void; };

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Setup the mock VM object that will be returned by DefaultRubyVM
    mockVm = {
      eval: vi.fn().mockImplementation(async (code: string) => {
        // Simulate running the code by calling the print function
        // This simulates the behavior of the actual VM
        if (code.includes('Hello from test')) {
            mockVm.print('stdout', 'Hello from test');
        } else if (code.includes('error')) {
            throw new Error('Runtime error');
        }
      }),
      print: vi.fn(),
    };

    // Make DefaultRubyVM return a promise that resolves to our mock VM
    (RubyWASM.DefaultRubyVM as vi.Mock).mockResolvedValue(mockVm);
  });

  it('should render the component correctly and initialize the VM', async () => {
    render(<RubyRunner />);

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

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /run/i })).toBeEnabled();
    });

    const runButton = screen.getByRole('button', { name: /run/i });
    const textarea = screen.getByRole('textbox');

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
    (RubyWASM.DefaultRubyVM as vi.Mock).mockRejectedValue(new Error('WASM Load Error'));

    render(<RubyRunner />);

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
