"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { QueryClient } from "@/Provider/query-client-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClient>
        {children}
      </QueryClient>
    </Provider>
  );
}
