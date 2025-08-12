import RepoCard from '../components/RepoCard';
import { REPOSITORIES } from '../data/repositories';

export default function Home() {
  const extendedRepos = [...REPOSITORIES, ...REPOSITORIES];

  return (
    <div className="flex flex-col bg-white h-screen -mt-16 -mb-12">
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black">Hello World!</h1>
      </div>
      <div className="w-full overflow-hidden py-8 mb-8">
        <div className="flex animate-scroll space-x-8" data-testid="repo-scroller">
          {extendedRepos.map((repo, index) => (
            <RepoCard key={`${repo.name}-${index}`} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
