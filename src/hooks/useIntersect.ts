import { useCallback, useEffect, useRef, useState } from 'react';

const useIntersect = (
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => void,
  options?: IntersectionObserverInit,
) => {
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          setLoading(true);
          await onIntersect(entry, observer);
        }
        setLoading(false);
      });
    },
    [onIntersect],
  );

  useEffect(() => {
    if (!ref.current) return;
    if (loading) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return { ref, loading };
};

export default useIntersect;
