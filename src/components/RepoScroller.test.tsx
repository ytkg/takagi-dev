/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RepoScroller from './RepoScroller';
import { Repository } from '../types';

// Mock the useInfiniteScroll hook
vi.mock('../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: vi.fn(),
}));

describe('RepoScroller component', () => {
  const mockRepos: Repository[] = [
    {
      name: 'Test Repo 1',
      description: 'This is the first test repository.',
      html_url: 'https://github.com/test/test-repo-1',
      stargazers_count: 100,
      forks_count: 10,
      language: 'TypeScript',
    },
    {
      name: 'Test Repo 2',
      description: 'This is the second test repository.',
      html_url: 'https://github.com/test/test-repo-2',
      stargazers_count: 200,
      forks_count: 20,
      language: 'JavaScript',
    },
  ];

  it('renders a list of repositories', () => {
    render(<RepoScroller repos={mockRepos} />);

    // Check for the repository names
    const repo1Name = screen.getByText('Test Repo 1');
    expect(repo1Name).toBeInTheDocument();

    const repo2Name = screen.getByText('Test Repo 2');
    expect(repo2Name).toBeInTheDocument();
  });

  it('renders a link for each repository', () => {
    render(<RepoScroller repos={mockRepos} />);

    // Check for the repository links
    const repo1Link = screen.getByRole('link', { name: 'Test Repo 1' });
    expect(repo1Link).toHaveAttribute('href', 'https://github.com/test/test-repo-1');

    const repo2Link = screen.getByRole('link', { name: 'Test Repo 2' });
    expect(repo2Link).toHaveAttribute('href', 'https://github.com/test/test-repo-2');
  });
});
