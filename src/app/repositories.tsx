import RepositoryCard from './repository-card';

const repositories = [
  {
    name: 'switchbot',
    description: 'A Ruby client for the SwitchBot API.',
    url: 'https://github.com/ytkg/switchbot',
  },
  {
    name: 'commit-genius',
    description: 'Generate commit messages with AI.',
    url: 'https://github.com/ytkg/commit-genius',
  },
  {
    name: 'komeda',
    description: 'A Ruby client for the Komeda Wi-Fi portal.',
    url: 'https://github.com/ytkg/komeda',
  },
  {
    name: 'bundle_outdated_formatter',
    description: 'A tool to format the output of `bundle outdated`.',
    url: 'https://github.com/ytkg/bundle_outdated_formatter',
  },
];

export default function Repositories() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">My GitHub Repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repositories.map((repo) => (
          <RepositoryCard
            key={repo.name}
            name={repo.name}
            description={repo.description}
            url={repo.url}
          />
        ))}
      </div>
    </div>
  );
}
