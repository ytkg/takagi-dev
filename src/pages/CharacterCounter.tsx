import React, { useState } from 'react';

export default function CharacterCounter() {
  const [input, setInput] = useState('');

  const handleClear = () => {
    setInput('');
  };

  const charCountWithoutNewlines = input.replace(/\n/g, '').length;
  const charCountWithNewlines = input.length;
  const wordCount = input.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Character & Word Counter</h1>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <textarea
            className="w-full h-64 p-2 border rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-800 dark:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter text here...'
          />
        </div>
        <div className="flex space-x-4">
            <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                <h2 className="text-lg font-semibold">Characters</h2>
                <p className="text-2xl font-bold dark:text-white">{charCountWithNewlines}</p>
            </div>
            <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                <h2 className="text-lg font-semibold">Characters (no newlines)</h2>
                <p className="text-2xl font-bold dark:text-white">{charCountWithoutNewlines}</p>
            </div>
            <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                <h2 className="text-lg font-semibold">Words</h2>
                <p className="text-2xl font-bold dark:text-white">{wordCount}</p>
            </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
