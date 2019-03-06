import { useRef, useEffect } from 'react';

export function useTick(callback, delay = 1000) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
