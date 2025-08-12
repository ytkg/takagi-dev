import { FiGithub } from 'react-icons/fi';

interface RepositoryCardProps {
  name: string;
  description: string;
  url: string;
}

export default function RepositoryCard({ name, description, url }: RepositoryCardProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex items-center mb-2">
        <FiGithub className="w-6 h-6 mr-2" />
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
    </a>
  );
}
