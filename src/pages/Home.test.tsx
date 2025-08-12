import { render, screen } from '@testing-library/react';
import Home from './Home';
import { REPOSITORIES } from '../data/repositories';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const helloWorldHeading = screen.getByRole('heading', { name: /hello world/i, level: 1 });
    expect(helloWorldHeading).toBeInTheDocument();
  });

  it('renders all repository cards from the data file', () => {
    render(<Home />);
    for (const repo of REPOSITORIES) {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
    }
    const repoLinks = screen.getAllByRole('link');
    expect(repoLinks).toHaveLength(REPOSITORIES.length);
  });

  it('positions the repository list at the bottom', () => {
    render(<Home />);
    const helloWorldHeading = screen.getByRole('heading', { name: /hello world/i, level: 1 });
    const firstRepoCard = screen.getByText(REPOSITORIES[0].name);

    // Check that the heading's parent has flex-grow to push content down
    const headingContainer = helloWorldHeading.parentElement;
    expect(headingContainer).toHaveClass('flex-grow');

    // Check that the repo card container is a sibling to the heading's container
    const repoSectionContainer = firstRepoCard.closest('.w-full.py-8');
    expect(headingContainer?.parentElement).toBe(repoSectionContainer?.parentElement);
  });
});
