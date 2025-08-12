import { render, screen } from '@testing-library/react';
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

  it('positions the repository list at the bottom', () => {
    render(<Home />);
    const helloWorldHeading = screen.getByRole('heading', { name: /hello world/i, level: 1 });
    const firstRepoCard = screen.getAllByText(REPOSITORIES[0].name)[0];

    // Check that the heading's parent has flex-grow to push content down
    const headingContainer = helloWorldHeading.parentElement;
    expect(headingContainer).toHaveClass('flex-grow');

    // Check that the repo card container is a sibling to the heading's container
    const repoSectionContainer = firstRepoCard.closest('.w-full.overflow-x-auto');
    expect(headingContainer?.parentElement).toBe(repoSectionContainer?.parentElement);
  });
});
