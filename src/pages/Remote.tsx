import { useState, useEffect, useRef } from 'react';

export default function Remote() {
  const [temperature, setTemperature] = useState(28.0);
  const MIN_TEMP = 18;
  const MAX_TEMP = 30;
  const [isFlashing, setIsFlashing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const isInitialMount = useRef(true);

  const playBeep = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      setIsFlashing(true);
      playBeep();
      setTimeout(() => setIsFlashing(false), 200); // Flash duration

      // Lock controls for 5 seconds
      setIsLocked(true);
      setTimeout(() => setIsLocked(false), 5000);
    }, 600); // 0.6-second delay

    return () => {
      clearTimeout(handler);
    };
  }, [temperature]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(parseFloat(e.target.value));
  };

  const sliderPercentage = ((temperature - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100;
  const sliderStyle = {
    background: `linear-gradient(to top, #3b82f6 ${sliderPercentage}%, #d1d5db ${sliderPercentage}%)`,
  };

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
          <span className="text-6xl font-mono">{temperature.toFixed(1)}</span>
          <span className="text-2xl align-top">&deg;C</span>
        </div>
        <div className="flex justify-center items-center h-48 mb-6">
          <div className="relative w-20 h-full flex items-center justify-center">
            <input
              type="range"
              min={MIN_TEMP}
              max={MAX_TEMP}
              step="0.2"
              value={temperature}
              onChange={handleSliderChange}
              disabled={isLocked}
              style={sliderStyle}
              className="w-36 h-4 -rotate-90 appearance-none cursor-pointer rounded-full disabled:opacity-50 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
              aria-label="Temperature slider"
            />
            <div className="absolute -right-8 text-xs text-gray-500">{MIN_TEMP}&deg;C</div>
            <div className="absolute -left-8 text-xs text-gray-500">{MAX_TEMP}&deg;C</div>
          </div>
        </div>
        <div className="flex justify-around">
          <button
            onClick={() => setTemperature(t => Math.max(MIN_TEMP, t - 0.2))}
            disabled={isLocked || temperature <= MIN_TEMP}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-2xl disabled:bg-gray-400"
            aria-label="Decrease temperature"
          >
            -
          </button>
          <button
            onClick={() => setTemperature(t => Math.min(MAX_TEMP, t + 0.2))}
            disabled={isLocked || temperature >= MAX_TEMP}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full text-2xl disabled:bg-gray-400"
            aria-label="Increase temperature"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
