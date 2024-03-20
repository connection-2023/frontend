import { useCallback, useEffect, useRef, useState } from 'react';

const useIntersect = (
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => Promise<void> | void,
  options?: IntersectionObserverInit,
) => {
  const isLoading = useRef(false);

  const ref = useRef<HTMLDivElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (isLoading.current) return;

      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          isLoading.current = true;
          await onIntersect(entry, observer);
          isLoading.current = false;
        }
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return { ref };
};

export default useIntersect;
