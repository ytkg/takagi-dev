import { useEffect, useState } from 'react';
import RepoCard from '../components/RepoCard';
import { Repository } from '../types';

const REPOS = ['ytkg/switchbot', 'ytkg/commit-genius', 'ytkg/komeda', 'ytkg/bundle_outdated_formatter'];

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const promises = REPOS.map(async (repoName) => {
        const response = await fetch(`https://api.github.com/repos/${repoName}`);
        const data = await response.json();
        return data;
      });
      const results = await Promise.all(promises);
      setRepos(results);
    };

    fetchRepos();
  }, []);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
