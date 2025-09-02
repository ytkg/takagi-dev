import RepoScroller from '../components/RepoScroller';
import { REPOSITORIES } from '../data/repositories';

export default function Home() {
  const extendedRepos = [...REPOSITORIES, ...REPOSITORIES];

  return (
    <>
    <div className="flex flex-col justify-center items-center bg-white h-[100dvh] -mt-16 -mb-12">
      <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black mb-14">Hello World!</h1>
    </div>
    <RepoScroller repos={extendedRepos} />
    </>
  );
}
