import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const useChangeSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams);

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(name, v));
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const changeParams = ({
    name,
    value,
  }: {
    name: string;
    value: string | string[];
  }) => {
    router.push(pathname + '?' + createQueryString(name, value));
  };

  return { router, pathname, searchParams, changeParams };
};

export default useChangeSearchParams;
