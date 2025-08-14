import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Tool1 from './pages/Tool1';
import Tool2 from './pages/Tool2';
import Tool3 from './pages/Tool3';
import JsonFormatter from './pages/JsonFormatter';
import Base64Converter from './pages/Base64Converter';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/tools/tool1" element={<Tool1 />} />
        <Route path="/tools/tool2" element={<Tool2 />} />
        <Route path="/tools/tool3" element={<Tool3 />} />
        <Route path="/tools/json-formatter" element={<JsonFormatter />} />
        <Route path="/tools/base64-converter" element={<Base64Converter />} />
      </Routes>
    </Layout>
  );
}

export default App;
