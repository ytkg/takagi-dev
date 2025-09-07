import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center bg-white h-[100dvh] -mt-16 -mb-12">
      <SEO
        title="About | takagi.dev"
        description="Site owner profile and links."
        path="/about"
      />
      <pre className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-mono text-center leading-snug">
        ┌ me ┐ ┌ <a href="https://ytkg.jp" target="_blank" rel="noopener noreferrer">web</a> ┐<br />
        takagi@ytkg.jp<br />
        │     └ <a href="https://x.com/ytkg_" target="_blank" rel="noopener noreferrer">x</a> ┘  │<br />
        └─── <a href="mailto:takagi@ytkg.jp">mail</a> ───┘
      </pre>
    </div>
  );
}
