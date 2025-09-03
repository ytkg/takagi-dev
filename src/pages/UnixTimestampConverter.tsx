import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000).toString());
  const [date, setDate] = useState(new Date(parseInt(timestamp, 10) * 1000));
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const ts = parseInt(timestamp, 10);
      if (isNaN(ts)) {
        setError('Invalid timestamp');
        return;
      }
      const newDate = new Date(ts * 1000);
      setDate(newDate);
      setError('');
    } catch (_e) {
      setError('Invalid timestamp');
    }
  }, [timestamp]);

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimestamp(e.target.value);
  };

  const handleDateChange = (part: 'FullYear' | 'Month' | 'Date' | 'Hours' | 'Minutes' | 'Seconds', value: string) => {
    const newDate = new Date(date);
    const numericValue = parseInt(value, 10);
    if (isNaN(numericValue)) return;

    switch (part) {
      case 'FullYear':
        newDate.setUTCFullYear(numericValue);
        break;
      case 'Month':
        newDate.setUTCMonth(numericValue - 1);
        break;
      case 'Date':
        newDate.setUTCDate(numericValue);
        break;
      case 'Hours':
        newDate.setUTCHours(numericValue);
        break;
      case 'Minutes':
        newDate.setUTCMinutes(numericValue);
        break;
      case 'Seconds':
        newDate.setUTCSeconds(numericValue);
        break;
    }

    setDate(newDate);
    setTimestamp(Math.floor(newDate.getTime() / 1000).toString());
  };

  const handleSetToNow = () => {
    const now = new Date();
    setDate(now);
    setTimestamp(Math.floor(now.getTime() / 1000).toString());
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(timestamp);
  };

  return (
    <div className="p-8">
      <SEO
        title="Unix Timestamp Converter | takagi.dev"
        description="Convert between Unix time and UTC datetime."
        path="/tools/unix-timestamp-converter"
        image="/ogp.png"
      />
      <h1 className="text-2xl font-bold mb-4">Unix Timestamp Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">Unix Timestamp</h2>
          <input
            type="text"
            className="w-full p-2 border rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-800 dark:text-white"
            value={timestamp}
            onChange={handleTimestampChange}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
           <div className="mt-4 flex space-x-2">
            <button onClick={handleSetToNow} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Set to Now</button>
            <button onClick={handleCopyToClipboard} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors">Copy</button>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Human-Readable Date (UTC)</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="number" value={date.getUTCFullYear()} onChange={e => handleDateChange('FullYear', e.target.value)} className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" placeholder="Year" />
            <input type="number" value={date.getUTCMonth() + 1} onChange={e => handleDateChange('Month', e.target.value)} className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" placeholder="Month" />
            <input type="number" value={date.getUTCDate()} onChange={e => handleDateChange('Date', e.target.value)} className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" placeholder="Day" />
            <input type="number" value={date.getUTCHours()} onChange={e => handleDateChange('Hours', e.target.value)} className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" placeholder="Hour" />
            <input type="number" value={date.getUTCMinutes()} onChange={e => handleDateChange('Minutes', e.target.value)} className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" placeholder="Minute" />
            <input type="number" value={date.getUTCSeconds()} onChange={e => handleDateChange('Seconds', e.target.value)} className="p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white" placeholder="Second" />
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Formatted Date: {date.toUTCString()}
          </p>
        </div>
      </div>
    </div>
  );
}
