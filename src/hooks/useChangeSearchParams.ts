import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const useChangeSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const changeParams = ({ name, value }: { name: string; value: string }) => {
    router.push(pathname + '?' + createQueryString(name, value));
  };

  return { router, pathname, searchParams, changeParams };
};

export default useChangeSearchParams;
