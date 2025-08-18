import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Remote from './Remote';

// Mock Web Audio API
const mockOscillator = { connect: vi.fn(), start: vi.fn(), stop: vi.fn(), type: '', frequency: { setValueAtTime: vi.fn() } };
const mockGainNode = { connect: vi.fn(), gain: { setValueAtTime: vi.fn() } };
const mockAudioContext = { createOscillator: vi.fn(() => mockOscillator), createGain: vi.fn(() => mockGainNode), destination: {}, currentTime: 0 };

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('AudioContext', vi.fn(() => mockAudioContext));
  vi.stubGlobal('webkitAudioContext', vi.fn(() => mockAudioContext));
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Remote', () => {
  it('renders the initial temperature', () => {
    render(<Remote />);
    expect(screen.getByText('28.0')).toBeInTheDocument();
  });

  it('updates temperature when the custom gauge is clicked', () => {
    render(<Remote />);
    const gauge = screen.getByTestId('custom-gauge');

    // Mock getBoundingClientRect for the test environment
    const mockRect = { bottom: 200, height: 144, top: 56, left: 0, right: 0, x: 0, y: 56, toJSON: () => {} };
    gauge.getBoundingClientRect = vi.fn(() => mockRect);

    // Click in the middle (y=128), which is (200-128)/144 = 50% of the way up.
    // 18 + (0.5 * (30-18)) = 18 + 6 = 24.
    act(() => {
      fireEvent.mouseDown(gauge, { clientY: 128 });
      fireEvent.mouseUp(gauge);
    });

    expect(screen.getByText('24.0')).toBeInTheDocument();
  });

  it('disables the decrease button at min temperature', () => {
    render(<Remote />);
    const decreaseButton = screen.getByRole('button', { name: 'Decrease temperature' });
    const gauge = screen.getByTestId('custom-gauge');
    gauge.getBoundingClientRect = vi.fn(() => ({ bottom: 200, height: 144, top: 56, left: 0, right: 0, x: 0, y: 56, toJSON: () => {} }));

    // Click at the bottom to set to min temp
    act(() => {
      fireEvent.mouseDown(gauge, { clientY: 200 });
      fireEvent.mouseUp(gauge);
    });

    expect(screen.getByText('18.0')).toBeInTheDocument();
    expect(decreaseButton).toBeDisabled();
  });

  it('disables the increase button at max temperature', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });
    const gauge = screen.getByTestId('custom-gauge');
    gauge.getBoundingClientRect = vi.fn(() => ({ bottom: 200, height: 144, top: 56, left: 0, right: 0, x: 0, y: 56, toJSON: () => {} }));

    // Click at the top to set to max temp
    act(() => {
      fireEvent.mouseDown(gauge, { clientY: 56 });
      fireEvent.mouseUp(gauge);
    });

    expect(screen.getByText('30.0')).toBeInTheDocument();
    expect(increaseButton).toBeDisabled();
  });

  it('locks controls and shows countdown for 5 seconds after a change is confirmed', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });
    const gauge = screen.getByTestId('custom-gauge');

    // Make a change
    fireEvent.click(increaseButton);
    act(() => { vi.advanceTimersByTime(600); });

    // Lock is active, check for countdown text and disabled controls
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(increaseButton).toBeDisabled();
    expect(gauge).toHaveClass('opacity-50');

    // Advance time to end the cooldown
    act(() => { vi.advanceTimersByTime(5000); });

    // Overlay should be gone and controls unlocked
    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(increaseButton).not.toBeDisabled();
    expect(gauge).not.toHaveClass('opacity-50');
  });
});
