import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const isClient = typeof window === 'object';
  const [matches, setMatches] = useState(
    isClient ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    if (!isClient) {
      return undefined;
    }

    const media = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [isClient, matches, query]);

  return matches;
};

export default useMediaQuery;
