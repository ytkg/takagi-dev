import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UnixTimestampConverter from './UnixTimestampConverter';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';

describe('UnixTimestampConverter', () => {
  it('renders the component correctly', () => {
    render(<UnixTimestampConverter />);
    expect(screen.getByText('Unix Timestamp Converter')).toBeInTheDocument();
    expect(screen.getByText('Unix Timestamp')).toBeInTheDocument();
    expect(screen.getByText('Human-Readable Date (UTC)')).toBeInTheDocument();
  });

  it('converts timestamp to date', async () => {
    const user = userEvent.setup();
    render(<UnixTimestampConverter />);
    // There is only one timestamp input, so this should be safe.
    const timestampInput = screen.getByRole('textbox');

    await user.clear(timestampInput);
    await user.type(timestampInput, '1672531200');

    expect(await screen.findByDisplayValue('2023')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Month')).toHaveValue(1);
    expect(screen.getByPlaceholderText('Day')).toHaveValue(1);
    expect(screen.getByPlaceholderText('Hour')).toHaveValue(0);
    expect(screen.getByPlaceholderText('Minute')).toHaveValue(0);
    expect(screen.getByPlaceholderText('Second')).toHaveValue(0);
  });

  it('shows an error for an invalid timestamp', async () => {
    const user = userEvent.setup();
    render(<UnixTimestampConverter />);
    const timestampInput = screen.getByRole('textbox');

    await user.clear(timestampInput);
    await user.type(timestampInput, 'invalid');

    expect(await screen.findByText('Invalid timestamp')).toBeInTheDocument();
  });
});
