import { StarIcon, ShareIcon } from '@heroicons/react/24/solid';
import { Repository } from '../types';

interface RepoCardProps {
  repo: Repository;
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col justify-between w-80 flex-shrink-0">
      <div>
        <h3 className="text-xl font-bold mb-2">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {repo.name}
          </a>
        </h3>
        {repo.description && <p className="text-gray-700 mb-4">{repo.description}</p>}
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <span className="mr-4 flex items-center">
          <StarIcon className="h-4 w-4 mr-1" />
          {repo.stargazers_count}
        </span>
        <span className="mr-4 flex items-center">
          <ShareIcon className="h-4 w-4 mr-1" />
          {repo.forks_count}
        </span>
        {repo.language && <span className="flex items-center">{repo.language}</span>}
      </div>
    </div>
  );
}
