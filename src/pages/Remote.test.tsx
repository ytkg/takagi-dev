import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Remote from './Remote';

describe('Remote', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the initial temperature', () => {
    render(<Remote />);
    expect(screen.getByText('28')).toBeInTheDocument();
  });

  it('increases the temperature when the + button is clicked', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });
    fireEvent.click(increaseButton);
    expect(screen.getByText('29')).toBeInTheDocument();
  });

  it('decreases the temperature when the - button is clicked', () => {
    render(<Remote />);
    const decreaseButton = screen.getByRole('button', { name: 'Decrease temperature' });
    fireEvent.click(decreaseButton);
    expect(screen.getByText('27')).toBeInTheDocument();
  });

  it('flashes the indicator 1 second after the last temperature change', () => {
    render(<Remote />);
    const indicator = screen.getByTestId('flash-indicator');
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });

    // Initial state
    expect(indicator).toHaveClass('bg-gray-300');

    // Click button
    fireEvent.click(increaseButton);
    expect(indicator).toHaveClass('bg-gray-300'); // Should not flash immediately

    // Advance time by 999ms
    act(() => {
      vi.advanceTimersByTime(999);
    });
    expect(indicator).toHaveClass('bg-gray-300'); // Still should not have flashed

    // Advance time by 1ms to reach the 1-second mark
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(indicator).toHaveClass('bg-green-500'); // Now it should be flashing

    // Advance time by 200ms for the flash to end
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(indicator).toHaveClass('bg-gray-300'); // Flash should be over
  });

  it('debounces the flash effect on multiple clicks', () => {
    render(<Remote />);
    const indicator = screen.getByTestId('flash-indicator');
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });

    // Click multiple times in quick succession
    fireEvent.click(increaseButton); // t=0
    act(() => { vi.advanceTimersByTime(500); }); // t=500ms
    fireEvent.click(increaseButton); // t=500ms, timer reset
    act(() => { vi.advanceTimersByTime(500); }); // t=1000ms
    fireEvent.click(increaseButton); // t=1000ms, timer reset

    // At this point, 1s has passed, but the timer was reset. Nothing should have flashed.
    expect(indicator).toHaveClass('bg-gray-300');

    // Advance time to 1 second after the *last* click
    act(() => {
      vi.advanceTimersByTime(1000);
    }); // t=2000ms
    expect(indicator).toHaveClass('bg-green-500'); // Now it should flash

    // Advance time for the flash to end
    act(() => {
      vi.advanceTimersByTime(200);
    }); // t=2200ms
    expect(indicator).toHaveClass('bg-gray-300');
  });
});
