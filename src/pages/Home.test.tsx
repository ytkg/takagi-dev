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
    // Each card has one link, so this verifies all cards are present
    expect(repoLinks).toHaveLength(REPOSITORIES.length);
  });

  it('uses absolute positioning for the repository list', () => {
    render(<Home />);
    const helloWorldHeading = screen.getByRole('heading', { name: /hello world/i, level: 1 });
    const firstRepoCard = screen.getByText(REPOSITORIES[0].name);

    // Check that the main container is relative
    const mainContainer = helloWorldHeading.parentElement;
    expect(mainContainer).toHaveClass('relative');

    // Check that the repo container is absolute
    const repoSectionContainer = firstRepoCard.closest('div.absolute');
    expect(repoSectionContainer).toBeInTheDocument();
  });
});
