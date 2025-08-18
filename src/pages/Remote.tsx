import { useState, useEffect, useRef } from 'react';

export default function Remote() {
  const [temperature, setTemperature] = useState(28.0);
  const MIN_TEMP = 18;
  const MAX_TEMP = 30;
  const [isFlashing, setIsFlashing] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const isInitialMount = useRef(true);
  const cooldownIntervalRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const gaugeRef = useRef<HTMLDivElement>(null);

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
      setTimeout(() => setIsFlashing(false), 200);

      setIsLocked(true);
      setTimeout(() => setIsLocked(false), 5000);

      setCooldownTime(5);
      if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
      cooldownIntervalRef.current = window.setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 600);

    return () => {
      clearTimeout(handler);
      if (cooldownIntervalRef.current) clearInterval(cooldownIntervalRef.current);
    };
  }, [temperature]);

  const calculateTempFromY = (y: number) => {
    if (!gaugeRef.current) return temperature;

    const rect = gaugeRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (rect.bottom - y) / rect.height));
    const newTemp = MIN_TEMP + percent * (MAX_TEMP - MIN_TEMP);
    // Snap to 0.2 increments
    return Math.round(newTemp / 0.2) * 0.2;
  };

  const handleInteractionStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isLocked) return;
    setIsDragging(true);
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setTemperature(calculateTempFromY(y));
  };

  const handleInteractionMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || isLocked) return;
    const y = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setTemperature(calculateTempFromY(y));
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleInteractionMove as any);
      window.addEventListener('touchmove', handleInteractionMove as any);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleInteractionMove as any);
      window.removeEventListener('touchmove', handleInteractionMove as any);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const sliderPercentage = ((temperature - MIN_TEMP) / (MAX_TEMP - MIN_TEMP)) * 100;

  const circumference = 2 * Math.PI * 54; // r=54
  const strokeDashoffset = circumference - (cooldownTime / 5) * circumference;

  return (
    <div className="bg-gray-100 flex items-center justify-center py-12">
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-80">
        {isLocked && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
            <svg className="w-32 h-32" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="12" fill="none" />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#3b82f6"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 linear"
              />
              <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="text-4xl font-bold text-gray-700">
                {cooldownTime}
              </text>
            </svg>
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700">Air Conditioner</h2>
          <div aria-hidden="true" data-testid="flash-indicator" className={`w-4 h-4 rounded-full transition-colors duration-200 ${isFlashing ? 'bg-green-500' : 'bg-gray-300'}`}></div>
        </div>
        <div className="bg-gray-800 text-white rounded-lg p-4 text-center mb-6">
          <span className="text-6xl font-mono">{temperature.toFixed(1)}</span>
          <span className="text-2xl align-top">&deg;C</span>
        </div>
        <div className="flex justify-center items-center gap-x-4 mb-6" style={{ height: '144px' }}>
          <div className="flex flex-col justify-between h-full text-xs text-gray-500">
            <span>{MAX_TEMP}&deg;C</span>
            <span>{MIN_TEMP}&deg;C</span>
          </div>
          <div
            ref={gaugeRef}
            onMouseDown={handleInteractionStart}
            onTouchStart={handleInteractionStart}
            data-testid="custom-gauge"
            className={`relative h-36 w-8 bg-gray-200 rounded-full cursor-pointer ${isLocked ? 'opacity-50' : ''}`}
          >
            <div
              className="absolute bottom-0 w-full bg-blue-500 rounded-full"
              style={{ height: `${sliderPercentage}%` }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-md border border-gray-200 pointer-events-none"
              style={{ bottom: `calc(${sliderPercentage}% - 12px)` }}
            />
          </div>
        </div>
        <div className="flex justify-around">
          <button onClick={() => setTemperature(t => Math.max(MIN_TEMP, t - 0.2))} disabled={isLocked || temperature <= MIN_TEMP} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full text-2xl disabled:bg-gray-400" aria-label="Decrease temperature">-</button>
          <button onClick={() => setTemperature(t => Math.min(MAX_TEMP, t + 0.2))} disabled={isLocked || temperature >= MAX_TEMP} className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-full text-2xl disabled:bg-gray-400" aria-label="Increase temperature">+</button>
        </div>
      </div>
    </div>
  );
}
