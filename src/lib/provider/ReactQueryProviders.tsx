'use client';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { reloadToast } from '@/utils/reloadMessage';
import { accessTokenReissuance } from '../apis/userApi';
import { FetchError } from '@/types/types';

export default function ReactQueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => {
    const accessTokenReissuanceWrapper = (message: string) =>
      accessTokenReissuance().catch((error) => {
        reloadToast(message, 'error');
        console.error(error);
      });

    const queryCacheError = async (error: Error) => {
      if (!(error instanceof Error)) return;

      const fetchError = error as FetchError;
      switch (fetchError.status) {
        case 401:
          await accessTokenReissuanceWrapper(
            '세션이 만료 되었습니다. 다시 로그인 해주세요.',
          );
          queryClient.invalidateQueries();
          break;
        default:
          console.error(error);
          break;
      }
    };

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
        mutations: {
          onError: (error: Error) => {
            toast.error('잠시후 다시 시도해주세요.');
            console.error(error);
          },
          retry: (failureCount, error) => {
            if (error instanceof Error) {
              const fetchError = error as FetchError;
              if (fetchError.status === 401) {
                accessTokenReissuanceWrapper('로그인 후 이용할 수 있습니다.');
                return true;
              }
            }
            return false;
          },
        },
      },
      queryCache: new QueryCache({
        onError: queryCacheError,
      }),
    });

    return queryClient;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
