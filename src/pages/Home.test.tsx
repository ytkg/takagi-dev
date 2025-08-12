import { render, screen } from '@testing-library/react';
import Home from './Home';
import { REPOSITORIES } from '../data/repositories';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const helloWorldHeading = screen.getByRole('heading', { name: /hello world/i, level: 1 });
    expect(helloWorldHeading).toBeInTheDocument();
  });

  it('renders a duplicated list of repository cards for infinite scroll', () => {
    render(<Home />);

    // Check that the number of rendered links is double the source data
    const repoLinks = screen.getAllByRole('link');
    expect(repoLinks).toHaveLength(REPOSITORIES.length * 2);

    // Check that the animation class is applied to the correct container
    const scrollingContainer = screen.getByTestId('repo-scroller');
    expect(scrollingContainer).toHaveClass('animate-scroll');
  });

  it('positions the repository list at the bottom', () => {
    render(<Home />);
    const helloWorldHeading = screen.getByRole('heading', { name: /hello world/i, level: 1 });
    const firstRepoCard = screen.getAllByText(REPOSITORIES[0].name)[0];

    // Check that the heading's parent has flex-grow to push content down
    const headingContainer = helloWorldHeading.parentElement;
    expect(headingContainer).toHaveClass('flex-grow');

    // Check that the repo card container is a sibling to the heading's container
    const repoSectionContainer = firstRepoCard.closest('.w-full.overflow-hidden');
    expect(headingContainer?.parentElement).toBe(repoSectionContainer?.parentElement);
  });
});
