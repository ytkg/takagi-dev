import RepoCard from '../components/RepoCard';
import { REPOSITORIES } from '../data/repositories';

export default function Home() {
  return (
    <div className="flex flex-col bg-white h-screen -mt-16 -mb-12">
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black">Hello World!</h1>
      </div>
      <div className="w-full py-8 mb-8">
        <div className="flex overflow-x-auto space-x-8 pb-4">
          {REPOSITORIES.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
