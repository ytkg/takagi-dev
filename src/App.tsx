import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Tool1 from './pages/Tool1';
import Tool2 from './pages/Tool2';
import Tool3 from './pages/Tool3';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tools/tool1" element={<Tool1 />} />
          <Route path="/tools/tool2" element={<Tool2 />} />
          <Route path="/tools/tool3" element={<Tool3 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
