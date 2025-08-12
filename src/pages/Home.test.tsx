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

  it('has a single hero container for all content', async () => {
    render(<Home />);
    const helloWorldHeading = await screen.findByRole('heading', { name: /hello world/i, level: 1 });
    const firstRepoCard = await screen.findByText(MOCK_REPOS[0].name);

    // Find the container of the repo cards
    const repoContainer = firstRepoCard.closest('.w-full.max-w-4xl');

    // Check that the heading and the repo container share the same parent
    expect(helloWorldHeading.parentElement).toBe(repoContainer?.parentElement);

    // Check that the parent has the hero section classes
    const heroContainer = helloWorldHeading.parentElement;
    expect(heroContainer).toHaveClass('flex');
    expect(heroContainer).toHaveClass('flex-col');
    expect(heroContainer).toHaveClass('justify-center');
    expect(heroContainer).toHaveClass('items-center');
    expect(heroContainer).toHaveClass('h-screen');
  });
});
