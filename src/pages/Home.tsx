import { useState, useEffect, useRef } from 'react';
import RepoCard from '../components/RepoCard';
import { REPOSITORIES } from '../data/repositories';

export default function Home() {
  const extendedRepos = [...REPOSITORIES, ...REPOSITORIES];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused) {
        // When the scroll position reaches the halfway point, reset to the beginning
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        } else {
          scroller.scrollLeft += 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <div className="flex flex-col bg-white h-screen -mt-16 -mb-12">
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black">Hello World!</h1>
      </div>
      <div
        className="w-full overflow-x-auto py-8 mb-8"
        ref={scrollerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex space-x-8">
          {extendedRepos.map((repo, index) => (
            <RepoCard key={`${repo.name}-${index}`} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
}
