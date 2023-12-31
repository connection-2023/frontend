import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useChangeSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams);

      if (Array.isArray(value)) {
        params.delete(name);
        if (value.length > 0) {
          value.forEach((v) => params.append(name, v));
        }
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const removeParams = (name: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(name);

    router.push(pathname + '?' + params.toString());
  };

  const changeParams = ({
    name,
    value,
  }: {
    name: string;
    value: string | string[];
  }) => {
    const isArrayWithValue = Array.isArray(value) && value.length > 0;
    const isStringWithValue = !Array.isArray(value) && value;

    let newQueryString = '';

    if (isArrayWithValue || isStringWithValue) {
      newQueryString = createQueryString(name, value);
    }

    if (newQueryString) {
      router.push(pathname + '?' + newQueryString);
    } else {
      removeParams(name);
    }
  };

  return { router, pathname, searchParams, changeParams, removeParams };
};

export default useChangeSearchParams;
