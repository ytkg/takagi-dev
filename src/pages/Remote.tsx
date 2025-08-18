import { useState } from 'react';

export default function Remote() {
  const [temperature, setTemperature] = useState(28);

  const increaseTemp = () => setTemperature(prev => prev + 1);
  const decreaseTemp = () => setTemperature(prev => prev - 1);

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Air Conditioner</h2>
        </div>
        <div className="bg-gray-800 text-white rounded-lg p-4 text-center mb-6">
          <span className="text-6xl font-mono">{temperature}</span>
          <span className="text-2xl align-top">&deg;C</span>
        </div>
        <div className="flex justify-around">
          <button
            onClick={decreaseTemp}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-2xl"
          >
            -
          </button>
          <button
            onClick={increaseTemp}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full text-2xl"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
