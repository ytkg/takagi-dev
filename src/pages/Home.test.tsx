import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import { REPOSITORIES } from '../data/repositories';

// Mock requestAnimationFrame for Vitest/JSDOM environment
vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
  return setTimeout(() => cb(0), 0);
});
vi.stubGlobal('cancelAnimationFrame', (id: number) => {
  clearTimeout(id);
});


describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const helloWorldHeading = screen.getByRole('heading', { name: /hello world/i, level: 1 });
    expect(helloWorldHeading).toBeInTheDocument();
  });

  it('renders a duplicated list of repository cards', () => {
    render(<Home />);

    const repoLinks = screen.getAllByRole('link');
    expect(repoLinks).toHaveLength(REPOSITORIES.length * 2);
  });

  it('matches the snapshot', () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
