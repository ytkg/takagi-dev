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

  it('locks controls and shows countdown for 5 seconds after a change is confirmed', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });
    const decreaseButton = screen.getByRole('button', { name: 'Decrease temperature' });
    const slider = screen.getByRole('slider');

    // Make a change
    fireEvent.click(increaseButton);
    act(() => { vi.advanceTimersByTime(600); });

    // Lock is active, check for countdown text and disabled controls
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(increaseButton).toBeDisabled();
    expect(decreaseButton).toBeDisabled();
    expect(slider).toBeDisabled();

    // Advance time and check countdown
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('4')).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('3')).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByText('1')).toBeInTheDocument();

    // Advance time to end the cooldown
    act(() => { vi.advanceTimersByTime(1000); });

    // Overlay should be gone and controls unlocked
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(increaseButton).not.toBeDisabled();
  });
});
