import { useState, useRef } from 'react';
import RepoCard from '../components/RepoCard';
import { REPOSITORIES } from '../data/repositories';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export default function Home() {
  const extendedRepos = [...REPOSITORIES, ...REPOSITORIES];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useInfiniteScroll(scrollerRef, isPaused);

  return (
    <div className="flex flex-col bg-white h-full">
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black">Hello World!</h1>
      </div>
      <div
        className="w-full overflow-x-auto py-8 mb-8"
        ref={scrollerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex space-x-8 px-8">
          {extendedRepos.map((repo, index) => (
            <RepoCard key={`${repo.name}-${index}`} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
