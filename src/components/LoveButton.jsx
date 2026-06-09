import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { getUserId } from '../analytics';
import { isLoveEnabled, getInitialLoveState, addLove, removeLove } from '../likesService';

export function LoveButton({ theme, dividerClassName }) {
  const [count, setCount] = useState(0);
  const [loved, setLoved] = useState(false);
  const [ready, setReady] = useState(false);
  const toggling = useRef(false);
  const controls = useAnimationControls();

  useEffect(() => {
    if (!isLoveEnabled) return;
    getInitialLoveState(getUserId()).then(({ count, loved }) => {
      setCount(count);
      setLoved(loved);
      setReady(true);
    });
  }, []);

  if (!isLoveEnabled || !ready) return null;

  const handleToggle = async () => {
    if (toggling.current) return;
    toggling.current = true;

    const wasLoved = loved;
    const prevCount = count;
    setLoved(!wasLoved);
    setCount(wasLoved ? prevCount - 1 : prevCount + 1);
    controls.start({ scale: [1, 1.3, 1] });

    const newCount = wasLoved
      ? await removeLove(getUserId())
      : await addLove(getUserId());

    if (newCount === null) {
      setLoved(wasLoved);
      setCount(prevCount);
    } else {
      setCount(newCount);
    }

    toggling.current = false;
  };

  const heartColor = loved
    ? (theme === 'light' ? '#e11d48' : '#fb7185')
    : 'currentColor';

  return (
    <>
    <button
      onClick={handleToggle}
      className={`flex items-center gap-1.5 transition-opacity hover:opacity-70 ${
        theme === 'light' ? 'text-neutral-900' : 'text-gray-400'
      }`}
      aria-label={loved ? 'Remove love' : 'Love this tool'}
      aria-pressed={loved}
    >
      <motion.span
        animate={controls}
        transition={{ type: 'spring', stiffness: 400, damping: 10, duration: 0.3 }}
        className="material-symbols-rounded"
        style={{
          fontSize: '20px',
          fontVariationSettings: `'FILL' ${loved ? 1 : 0}`,
          color: heartColor,
          transition: 'color 0.2s ease, font-variation-settings 0.2s ease',
        }}
      >
        favorite
      </motion.span>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="text-sm font-medium tabular-nums"
        >
          {count}
        </motion.span>
      </AnimatePresence>
    </button>
    {dividerClassName && <div className={dividerClassName}></div>}
    </>
  );
}
