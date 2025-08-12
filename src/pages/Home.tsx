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
    <div className="flex flex-col bg-white h-screen -mt-16 -mb-12">
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black">Hello World!</h1>
      </div>
      <div className="w-full py-8">
        <div className="flex overflow-x-auto space-x-8 pb-4">
          {repos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
