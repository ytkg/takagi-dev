export default function About() {
  return (
    <div className="flex flex-col justify-center items-center bg-white h-screen -mt-16 -mb-12">
      <pre className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-mono text-center leading-normal">
        {`┌ me ┐ ┌ web ┐
takagi@ytkg.jp
│     └ x ┘  │
└─── mail ───┘`}
      </pre>
    </div>
  );
}
