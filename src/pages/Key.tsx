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

const Key = () => (
  <svg
    className="key"
    width="80"
    height="180"
    viewBox="0 0 1024 1024"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transition: 'transform 0.5s ease-in-out',
      zIndex: 0,
    }}
  >
    <path
      d="M510.786 76.601c16.263 0 32.546 5.362 44.946 16.097 139.949 121.188 279.9 242.378 419.818 363.587 24.241 20.995 24.295 53.413 0.079 74.396C835.48 652.1 695.28 773.476 555.141 894.897c-11.813 10.238-25.813 15.502-42.45 15.502-19.109-0.528-34.854-5.735-47.854-16.996C326.324 773.382 187.724 653.45 49.275 533.386c-19.581-16.987-24.96-43.81-11.895-65.25 3.919-6.438 8.669-11.829 14.465-16.849 138.108-119.552 276.179-239.135 414.262-358.72 12.296-10.639 28.478-15.966 44.679-15.966z"
      fill="#D4AF37"
    />
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
        <Key />
      </div>
      {isUnlocked && <p className="mt-4 text-2xl font-bold">Unlocked!</p>}
    </div>
  );
}
