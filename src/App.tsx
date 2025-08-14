import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Tool1 from './pages/Tool1';
import Tool2 from './pages/Tool2';
import Tool3 from './pages/Tool3';
import JsonFormatter from './pages/JsonFormatter';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tools/tool1" element={<Tool1 />} />
          <Route path="/tools/tool2" element={<Tool2 />} />
          <Route path="/tools/tool3" element={<Tool3 />} />
          <Route path="/tools/json-formatter" element={<JsonFormatter />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
