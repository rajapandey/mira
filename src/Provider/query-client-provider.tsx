"use client";

import { QueryClient as QC, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export function QueryClient({ children }: { children: React.ReactNode }) {
  const queryClient = new QC({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
        onError: (error: any) => {
          console.error('Mutation error:', error);
          if (error.response?.status === 401 || error.response?.status === 403) {
            console.log('Authentication error in mutation');
          }
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error: any, query: any) => {
        console.error('Query error:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log('Authentication error in query:', query.queryKey);
        }
      },
    }),
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
