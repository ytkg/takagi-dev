export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center h-12 bg-black text-white font-mono">
      <p className="md:block hidden">Copyright &copy; {year} takagi.dev All rights reserved.</p>
      <p className="md:hidden">&copy; {year} takagi.dev</p>
    </footer>
  );
}
