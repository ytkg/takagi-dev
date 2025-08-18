import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Remote from './Remote';

describe('Remote', () => {
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

  it('flashes the indicator when the temperature changes', async () => {
    render(<Remote />);
    const indicator = screen.getByTestId('flash-indicator');

    // Check initial state (not flashing)
    expect(indicator).toHaveClass('bg-gray-300');

    // Click button to trigger flash
    const increaseButton = screen.getByRole('button', { name: 'Increase temperature' });
    fireEvent.click(increaseButton);

    // Check for flashing state
    expect(indicator).toHaveClass('bg-green-500');

    // Wait for the flash to end
    await waitFor(() => {
      expect(indicator).toHaveClass('bg-gray-300');
    }, { timeout: 500 });
  });
});
