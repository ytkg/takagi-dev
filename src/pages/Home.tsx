import RepoCard from '../components/RepoCard';
import { REPOSITORIES } from '../data/repositories';

export default function Home() {
  return (
    <div className="relative flex justify-center items-center bg-white h-full">
      <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black">Hello World!</h1>
      <div className="absolute bottom-0 left-0 right-0 w-full py-8 mb-8">
        <div className="flex overflow-x-auto space-x-8 pb-4">
          {REPOSITORIES.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
