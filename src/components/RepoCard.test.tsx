import { render, screen } from '@testing-library/react';
import RepoCard from './RepoCard';
import type { Repository } from '../types';

describe('RepoCard component', () => {
  const mockRepo: Repository = {
    name: 'Test Repo',
    description: 'This is a test repository.',
    html_url: 'https://github.com/test/test-repo',
    stargazers_count: 123,
    forks_count: 45,
    language: 'TypeScript',
  };

  it('renders all repository information correctly', () => {
    render(<RepoCard repo={mockRepo} />);

    // Check for the repository name and link
    const nameElement = screen.getByRole('link', { name: mockRepo.name });
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveAttribute('href', mockRepo.html_url);

    // Check for the description
    const descriptionElement = screen.getByText(mockRepo.description);
    expect(descriptionElement).toBeInTheDocument();

    // Check for the star count
    const starElement = screen.getByText(mockRepo.stargazers_count.toString());
    expect(starElement).toBeInTheDocument();

    // Check for the fork count
    const forkElement = screen.getByText(mockRepo.forks_count.toString());
    expect(forkElement).toBeInTheDocument();

    // Check for the language
    const languageElement = screen.getByText(mockRepo.language);
    expect(languageElement).toBeInTheDocument();
  });
});
