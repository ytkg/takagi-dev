import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Remote from './Remote';

// Mock Web Audio API
const mockOscillator = {
  connect: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  type: '',
  frequency: { setValueAtTime: vi.fn() },
};
const mockGainNode = { connect: vi.fn(), gain: { setValueAtTime: vi.fn() } };
const mockAudioContext = {
  createOscillator: vi.fn(() => mockOscillator),
  createGain: vi.fn(() => mockGainNode),
  destination: {},
  currentTime: 0,
};

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

  it('adheres to the min temperature of 18', () => {
    render(<Remote />);
    const decreaseButton = screen.getByRole('button', { name: 'Decrease temperature' });
    // Set temp to just above min
    act(() => {
      fireEvent.change(screen.getByRole('slider'), { target: { value: '18.2' } });
    });
    expect(screen.getByText('18.2')).toBeInTheDocument();

    fireEvent.click(decreaseButton);
    expect(screen.getByText('18.0')).toBeInTheDocument();

    // Check if button is disabled at min temp
    expect(decreaseButton).toBeDisabled();
    fireEvent.click(decreaseButton);
    expect(screen.getByText('18.0')).toBeInTheDocument(); // Should not go below 18
  });

  it('adheres to the max temperature of 30', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });
    // Set temp to just below max
    act(() => {
      fireEvent.change(screen.getByRole('slider'), { target: { value: '29.8' } });
    });
    expect(screen.getByText('29.8')).toBeInTheDocument();

    fireEvent.click(increaseButton);
    expect(screen.getByText('30.0')).toBeInTheDocument();

    // Check if button is disabled at max temp
    expect(increaseButton).toBeDisabled();
    fireEvent.click(increaseButton);
    expect(screen.getByText('30.0')).toBeInTheDocument(); // Should not go above 30
  });

  it('locks controls for 5 seconds after a change is confirmed', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });
    const decreaseButton = screen.getByRole('button', { name: 'Decrease temperature' });
    const slider = screen.getByRole('slider');

    // Make a change
    fireEvent.click(increaseButton);
    expect(screen.getByText('28.2')).toBeInTheDocument();

    // Advance time to trigger the lock
    act(() => { vi.advanceTimersByTime(600); });

    // Controls should now be locked
    expect(increaseButton).toBeDisabled();
    expect(decreaseButton).toBeDisabled();
    expect(slider).toBeDisabled();

    // Advance time by 4.999 seconds
    act(() => { vi.advanceTimersByTime(4999); });

    // Controls should still be locked
    expect(increaseButton).toBeDisabled();

    // Advance time by 1ms to complete the 5s cooldown
    act(() => { vi.advanceTimersByTime(1); });

    // Controls should be unlocked
    expect(increaseButton).not.toBeDisabled();
    expect(decreaseButton).not.toBeDisabled();
    expect(slider).not.toBeDisabled();
  });
});
