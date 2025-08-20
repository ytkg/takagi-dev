import { useState } from 'react';

const Keyhole = () => (
  <svg
    className="keyhole"
    width="100"
    height="100"
    viewBox="0 0 512 512"
    style={{ zIndex: 1 }}
  >
    <path
      fill="#333"
      d="m205.7,259.7l-13.8,103.8c-1.3,7.6 3.9,23.1 20.2,23.1h87.6c16.6,0 21.9-16.3 20.2-23.1l-13.8-103.8c16.5-14.4 26.3-35.5 26.3-57.7 0-42.2-34.3-76.6-76.6-76.6-42.2,0-76.6,34.3-76.6,76.6 0.2,22.2 10.1,43.3 26.5,57.7zm50.3-93.4c19.7,0 35.7,16 35.7,35.7 0,12.8-6.6,24.3-17.7,30.8-7.1,4.2-11,12.2-9.9,20.3l12.3,92.7h-41l12.3-92.7c1.1-8.1-2.8-16.1-9.9-20.3-11.1-6.5-17.7-18-17.7-30.8 0.2-19.7 16.2-35.7 35.9-35.7z"
    />
  </svg>
);

const Thumbturn = () => (
  <svg
    className="thumbturn"
    width="80"
    height="80"
    viewBox="0 0 100 100"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'transform 0.5s ease-in-out',
      zIndex: 0,
    }}
  >
    <rect x="30" y="45" width="40" height="10" fill="#D4AF37" />
  </svg>
);

export default function KeyPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleKeyholeClick = () => {
    setIsUnlocked(!isUnlocked);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen -mt-16">
      <div
        className={`key-container ${isUnlocked ? 'unlocked' : ''}`}
        style={{ position: 'relative', width: 100, height: 100, cursor: 'pointer' }}
        onClick={handleKeyholeClick}
      >
        <Keyhole />
        <Thumbturn />
      </div>
      {isUnlocked && <p className="mt-4 text-2xl font-bold">Unlocked!</p>}
    </div>
  );
}
