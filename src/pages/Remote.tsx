import { useState } from 'react';

export default function Remote() {
  const [temperature, setTemperature] = useState(28);
  const [isFlashing, setIsFlashing] = useState(false);

  const handleTempChange = (newTemp: number) => {
    setTemperature(newTemp);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);
  };

  const increaseTemp = () => handleTempChange(temperature + 1);
  const decreaseTemp = () => handleTempChange(temperature - 1);

  return (
    <div className="bg-gray-100 flex items-center justify-center py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Air Conditioner</h2>
          <div
            aria-hidden="true"
            data-testid="flash-indicator"
            className={`w-4 h-4 rounded-full transition-colors duration-200 ${
              isFlashing ? 'bg-green-500' : 'bg-gray-300'
            }`}
          ></div>
        </div>
        <div className="bg-gray-800 text-white rounded-lg p-4 text-center mb-6">
          <span className="text-6xl font-mono">{temperature}</span>
          <span className="text-2xl align-top">&deg;C</span>
        </div>
        <div className="flex justify-around">
          <button
            onClick={decreaseTemp}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-2xl"
            aria-label="Decrease temperature"
          >
            -
          </button>
          <button
            onClick={increaseTemp}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full text-2xl"
            aria-label="Increase temperature"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
