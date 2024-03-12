'use client';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { useState } from 'react';
import { reloadToast } from '@/utils/reloadMessage';
import { accessTokenReissuance } from '../apis/userApi';
import { FetchError } from '@/types/types';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    const handleFetchError = async (error: Error) => {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        switch (fetchError.status) {
          case 401:
            try {
              await accessTokenReissuance();
              queryClient.invalidateQueries();
            } catch (error) {
              reloadToast(
                '세션이 만료되었습니다. 다시 로그인해주세요.',
                'error',
              );
              console.error(error);
            }
            break;
          default:
            console.error(error);
            break;
        }
      }
    };

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
        mutations: {
          onError: handleFetchError,
        },
      },
      queryCache: new QueryCache({
        onError: handleFetchError,
      }),
    });

    return queryClient;
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
