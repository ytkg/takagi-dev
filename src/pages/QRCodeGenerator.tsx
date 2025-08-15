import React, { useState } from 'react';
import QRCode from 'react-qr-code';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            className="w-full h-48 p-2 border rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-800 dark:text-white"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL to generate QR code..."
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <div
            className="w-full h-48 p-4 border rounded-md bg-white flex items-center justify-center"
            data-testid="qr-code-output"
          >
            {text ? (
              <QRCode
                value={text}
                size={160}
                viewBox={`0 0 256 256`}
                title="qr code"
              />
            ) : (
              <span className="text-gray-400">QR code will appear here</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setText('')}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          disabled={!text}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
