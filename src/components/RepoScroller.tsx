import { useState, useRef } from 'react';
import RepoCard from './RepoCard';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { Repository } from '../types';

interface RepoScrollerProps {
  repos: Repository[];
}

export default function RepoScroller({ repos }: RepoScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useInfiniteScroll(scrollerRef, isPaused);

  return (
    <div
      className="fixed bottom-12 left-0 right-0 z-40 w-full overflow-x-auto py-8 no-scrollbar"
      ref={scrollerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex space-x-8">
        {repos.map((repo, index) => (
          <RepoCard key={`${repo.name}-${index}`} repo={repo} />
        ))}
      </div>
    </div>
  );
}
