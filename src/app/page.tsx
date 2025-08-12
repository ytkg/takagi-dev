import Repositories from './repositories';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 -mt-16 -mb-12">
      <div className="flex flex-col justify-center items-center bg-white h-screen -mt-16 -mb-12">
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black mb-14">Hello World!</h1>
      </div>

      <Repositories />
    </main>
  )
}
