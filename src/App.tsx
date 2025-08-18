import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import JsonFormatter from './pages/JsonFormatter';
import Base64Converter from './pages/Base64Converter';
import CharacterCounter from './pages/CharacterCounter';
import QRCodeGenerator from './pages/QRCodeGenerator';
import UnixTimestampConverter from './pages/UnixTimestampConverter';
import Remote from './pages/Remote';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/tools/json-formatter" element={<JsonFormatter />} />
        <Route path="/tools/base64-converter" element={<Base64Converter />} />
        <Route path="/tools/character-counter" element={<CharacterCounter />} />
        <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
        <Route path="/tools/unix-timestamp-converter" element={<UnixTimestampConverter />} />
      </Route>
      <Route path="/remote" element={<Remote />} />
    </Routes>
  );
}

export default App;
