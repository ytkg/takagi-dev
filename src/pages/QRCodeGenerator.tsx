import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import QRCode from 'react-qr-code';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (!qrCodeRef.current) {
      return;
    }

    const svgElement = qrCodeRef.current.querySelector('svg');
    if (!svgElement) {
      return;
    }

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgDataUri = `data:image/svg+xml;base64,${btoa(svgString)}`;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngDataUri = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngDataUri;
        downloadLink.download = 'qrcode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    img.src = svgDataUri;
  };

  return (
    <div className="p-8">
      <SEO
        title="QR Code Generator | takagi.dev"
        description="Generate QR codes instantly from text or URLs."
        path="/tools/qr-code-generator"
        image="/ogp.png"
      />
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
            ref={qrCodeRef}
          >
            {text ? (
              <QRCode value={text} size={160} viewBox="0 0 256 256" title="qr code" />
            ) : (
              <span className="text-gray-400">QR code will appear here</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => setText('')}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          disabled={!text}
        >
          Clear
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          disabled={!text}
        >
          Save Image
        </button>
      </div>
    </div>
  );
}
