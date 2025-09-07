import { useState } from 'react';
import SEO from '../components/SEO';

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError('');
    } catch (_e) {
      setError('Invalid JSON format. Please check your input.');
      setOutputJson('');
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
  };

  return (
    <div className="p-8">
      <SEO
        title="JSON Formatter | takagi.dev"
        description="Format, minify, and validate JSON online."
        path="/tools/json-formatter"
      />
      <h1 className="text-2xl font-bold mb-4">JSON Formatter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            className="w-full h-64 p-2 border rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-800 dark:text-white"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder='Paste your JSON here...'
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <pre className="w-full h-64 p-2 border rounded-md bg-gray-50 dark:bg-gray-800 overflow-auto">
            {error ? (
              <code className="text-red-500">{error}</code>
            ) : (
              <code className="dark:text-white">{outputJson}</code>
            )}
          </pre>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleFormat}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Format JSON
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
