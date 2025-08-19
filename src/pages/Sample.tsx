import { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';

const hiragana = [
  'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ',
  'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'
];

const getRandomHiragana = (exclude: string) => {
  let newChar;
  do {
    newChar = hiragana[Math.floor(Math.random() * hiragana.length)];
  } while (newChar === exclude);
  return newChar;
};

export default function Sample() {
  const [character, setCharacter] = useState('あ');
  const constraintsRef = useRef(null);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset } = info;
    const { innerWidth, innerHeight } = window;

    // A simple check to see if the element is dragged far enough off-screen
    const offScreen =
      offset.x < -innerWidth / 2 ||
      offset.x > innerWidth / 2 ||
      offset.y < -innerHeight / 2 ||
      offset.y > innerHeight / 2;

    if (offScreen) {
      setCharacter(getRandomHiragana(character));
    }
  };

  return (
    <div ref={constraintsRef} className="flex justify-center items-center w-full h-screen overflow-hidden -mt-16 -mb-12">
      <motion.div
        drag
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        // Snap back with a spring animation
        dragTransition={{
          bounceStiffness: 400,
          bounceDamping: 5
        }}
        className="text-9xl font-bold cursor-grab active:cursor-grabbing select-none"
      >
        {character}
      </motion.div>
    </div>
  );
}
