import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Remote from './Remote';

beforeEach(() => {
  vi.useFakeTimers();
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

    const mockRect = { bottom: 200, height: 144, top: 56, left: 0, right: 0, x: 0, y: 56, toJSON: () => {} };
    gauge.getBoundingClientRect = vi.fn(() => mockRect);

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

    fireEvent.click(increaseButton);
    act(() => { vi.advanceTimersByTime(600); });

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(increaseButton).toBeDisabled();
    expect(gauge).toHaveClass('opacity-50');

    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByText('4')).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(3000); });
    expect(screen.getByText('1')).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(1000); });

    expect(screen.queryByText('5')).not.toBeInTheDocument();
    expect(increaseButton).not.toBeDisabled();
    expect(gauge).not.toHaveClass('opacity-50');
  });
});
