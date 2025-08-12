import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home from './Home';
import { Repository } from '../types';

const MOCK_REPOS: Repository[] = [
  {
    name: 'switchbot',
    html_url: 'https://github.com/ytkg/switchbot',
    description: 'SwitchBot API client for Ruby',
    stargazers_count: 9,
    forks_count: 4,
    language: 'Ruby',
  },
  {
    name: 'commit-genius',
    html_url: 'https://github.com/ytkg/commit-genius',
    description: 'Generate commit messages with AI',
    stargazers_count: 10,
    forks_count: 2,
    language: 'TypeScript',
  },
  {
    name: 'komeda',
    html_url: 'https://github.com/ytkg/komeda',
    description: 'A Ruby script to check for Komeda Wi-Fi availability.',
    stargazers_count: 5,
    forks_count: 1,
    language: 'Ruby',
  },
  {
    name: 'bundle_outdated_formatter',
    html_url: 'https://github.com/ytkg/bundle_outdated_formatter',
    description: 'A tool to format the output of `bundle outdated`',
    stargazers_count: 3,
    forks_count: 0,
    language: 'Ruby',
  },
];

beforeEach(() => {
  global.fetch = vi.fn().mockImplementation((url: string) => {
    const repoFullName = url.split('repos/')[1];
    const repoName = repoFullName.split('/')[1];
    const mockRepo = MOCK_REPOS.find(repo => repo.name === repoName);
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockRepo),
    });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Home page', () => {
  it('renders the main heading', async () => {
    render(<Home />);
    const helloWorldHeading = await screen.findByRole('heading', { name: /hello world/i, level: 1 });
    expect(helloWorldHeading).toBeInTheDocument();
  });

  it('renders repository cards after fetching', async () => {
    render(<Home />);
    for (const repo of MOCK_REPOS) {
      expect(await screen.findByText(repo.name)).toBeInTheDocument();
    }
    const repoLinks = screen.getAllByRole('link');
    expect(repoLinks).toHaveLength(MOCK_REPOS.length);
  });

  it('positions the repository list at the bottom', async () => {
    render(<Home />);
    const helloWorldHeading = await screen.findByRole('heading', { name: /hello world/i, level: 1 });
    const firstRepoCard = await screen.findByText(MOCK_REPOS[0].name);

    // Check that the heading's parent has flex-grow to push content down
    const headingContainer = helloWorldHeading.parentElement;
    expect(headingContainer).toHaveClass('flex-grow');

    // Check that the repo card container is a sibling to the heading's container
    const repoSectionContainer = firstRepoCard.closest('.w-full.py-8');
    expect(headingContainer?.parentElement).toBe(repoSectionContainer?.parentElement);
  });
});
