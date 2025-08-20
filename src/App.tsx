import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import JsonFormatter from './pages/JsonFormatter';
import Base64Converter from './pages/Base64Converter';
import CharacterCounter from './pages/CharacterCounter';
import QRCodeGenerator from './pages/QRCodeGenerator';
import UnixTimestampConverter from './pages/UnixTimestampConverter';
import KeyPage from './pages/Key';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tools/json-formatter" element={<JsonFormatter />} />
          <Route path="/tools/base64-converter" element={<Base64Converter />} />
          <Route path="/tools/character-counter" element={<CharacterCounter />} />
          <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/tools/unix-timestamp-converter" element={<UnixTimestampConverter />} />
          <Route path="/key" element={<KeyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
