import { useEffect, RefObject } from 'react';

export function useInfiniteScroll(
  scrollerRef: RefObject<HTMLDivElement>,
  isPaused: boolean
) {
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused) {
        // When the scroll position reaches the halfway point, reset to the beginning
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        } else {
          scroller.scrollLeft += 1;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, scrollerRef]);
}
