import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the navbar with logo and links', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Check for the logo
    expect(screen.getByText('takagi.dev')).toBeInTheDocument();

    // Check for the links
    // Note: The links might appear multiple times (desktop and mobile)
    // so we use getAllByText
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
  });
});
