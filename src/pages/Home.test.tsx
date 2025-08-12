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
  it('renders both main headings', async () => {
    render(<Home />);

    // Check for "Hello World!"
    const helloWorldHeading = await screen.findByRole('heading', { name: /hello world/i, level: 1 });
    expect(helloWorldHeading).toBeInTheDocument();

    // Check for "My Repositories"
    const reposHeading = await screen.findByRole('heading', { name: /my repositories/i, level: 2 });
    expect(reposHeading).toBeInTheDocument();
  });

  it('renders repository cards after fetching', async () => {
    render(<Home />);

    for (const repo of MOCK_REPOS) {
      expect(await screen.findByText(repo.name)).toBeInTheDocument();
    }

    const repoLinks = screen.getAllByRole('link');
    expect(repoLinks).toHaveLength(MOCK_REPOS.length);
  });
});
