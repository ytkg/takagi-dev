import { useState } from 'react';
import SEO from '../components/SEO';
import { encode, decode } from '../utils/base64';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    try {
      const encoded = encode(input);
      setOutput(encoded);
      setError('');
    } catch (_e) {
      setError('Error encoding string. Please check your input.');
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decode(input);
      setOutput(decoded);
      setError('');
    } catch (_e) {
      setError('Invalid Base64 string. Please check your input.');
      setOutput('');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="p-8">
      <SEO
        title="Base64 Converter | takagi.dev"
        description="Encode and decode Base64 quickly online."
        path="/tools/base64-converter"
      />
      <h1 className="text-2xl font-bold mb-4">Base64 Encoder / Decoder</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            className="w-full h-64 p-2 border rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-800 dark:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter string to encode/decode...'
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <pre className="w-full h-64 p-2 border rounded-md bg-gray-50 dark:bg-gray-800 overflow-auto">
            {error ? (
              <code className="text-red-500">{error}</code>
            ) : (
              <code className="dark:text-white">{output}</code>
            )}
          </pre>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleEncode}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Decode
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
