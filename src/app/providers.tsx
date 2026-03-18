"use client";

import { ReactNode } from "react";
import { Provider as JotaiProvider } from "jotai";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <JotaiProvider>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AppRouterCacheProvider>
    </JotaiProvider>
  );
}
