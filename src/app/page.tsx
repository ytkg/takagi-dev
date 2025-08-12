import Repositories from './repositories';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen py-20 -mt-16 -mb-12">
      <div className="flex flex-col justify-center items-center text-center mb-16">
        <h1 className="lg:text-8xl md:text-7xl sm:text-6xl text-4xl font-black mb-14">Hello World!</h1>
      </div>

      <Repositories />
    </main>
  )
}
