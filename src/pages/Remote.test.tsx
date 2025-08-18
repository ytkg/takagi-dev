import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Remote from './Remote';

// Create a persistent mock oscillator
const mockOscillator = {
  connect: vi.fn(),
  start: vi.fn(),
  stop: vi.fn(),
  type: '',
  frequency: { setValueAtTime: vi.fn() },
};

// Create a persistent mock gain node
const mockGainNode = {
  connect: vi.fn(),
  gain: { setValueAtTime: vi.fn() },
};

// Mock AudioContext that returns the persistent mocks
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
  // Clear mock history before each test
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

  it('increases the temperature by 0.2 when the + button is clicked', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });
    fireEvent.click(increaseButton);
    expect(screen.getByText('28.2')).toBeInTheDocument();
  });

  it('decreases the temperature by 0.2 when the - button is clicked', () => {
    render(<Remote />);
    const decreaseButton = screen.getByRole('button', { name: 'Decrease temperature' });
    fireEvent.click(decreaseButton);
    expect(screen.getByText('27.8')).toBeInTheDocument();
  });

  it('updates the temperature when the slider is moved', () => {
    render(<Remote />);
    const slider = screen.getByRole('slider', { name: 'Temperature slider' });
    fireEvent.change(slider, { target: { value: '22.4' } });
    expect(screen.getByText('22.4')).toBeInTheDocument();
  });

  it('flashes and beeps 1 second after the last temperature change', () => {
    render(<Remote />);
    const indicator = screen.getByTestId('flash-indicator');
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });

    fireEvent.click(increaseButton);

    act(() => { vi.advanceTimersByTime(999); });
    expect(indicator).toHaveClass('bg-gray-300');
    expect(mockOscillator.start).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(1); });
    expect(indicator).toHaveClass('bg-green-500');
    expect(mockOscillator.start).toHaveBeenCalledOnce();

    act(() => { vi.advanceTimersByTime(200); });
    expect(indicator).toHaveClass('bg-gray-300');
  });

  it('debounces the flash and beep effect on multiple clicks', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });

    fireEvent.click(increaseButton);
    act(() => { vi.advanceTimersByTime(500); });
    fireEvent.click(increaseButton);
    act(() => { vi.advanceTimersByTime(500); });
    fireEvent.click(increaseButton);

    expect(mockOscillator.start).not.toHaveBeenCalled();

    act(() => { vi.advanceTimersByTime(1000); });
    expect(mockOscillator.start).toHaveBeenCalledOnce();
  });
});
