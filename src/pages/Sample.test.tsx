import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sample from './Sample';

describe('Sample Page', () => {
  it('renders the initial character "あ"', () => {
    render(
      <MemoryRouter>
        <Sample />
      </MemoryRouter>
    );
    expect(screen.getByText('あ')).toBeInTheDocument();
  });
});
