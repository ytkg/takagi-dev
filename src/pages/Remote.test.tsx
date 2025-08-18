import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Remote from './Remote';

describe('Remote', () => {
  it('renders the initial temperature', () => {
    render(<Remote />);
    expect(screen.getByText('28')).toBeInTheDocument();
  });

  it('increases the temperature when the + button is clicked', () => {
    render(<Remote />);
    const increaseButton = screen.getByRole('button', { name: '+' });
    fireEvent.click(increaseButton);
    expect(screen.getByText('29')).toBeInTheDocument();
  });

  it('decreases the temperature when the - button is clicked', () => {
    render(<Remote />);
    const decreaseButton = screen.getByRole('button', { name: '-' });
    fireEvent.click(decreaseButton);
    expect(screen.getByText('27')).toBeInTheDocument();
  });
});
