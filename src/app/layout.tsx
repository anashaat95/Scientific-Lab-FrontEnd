"use client";
import RootQueryClientProvider from "@/clients/RootQueryClient";
import ProgressBar from "@/components/ProgressBar";
import { ReduxStoreProvider } from "@/store/store";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxStoreProvider>
          <ProgressBar />
          <RootQueryClientProvider>
            <ThemeProvider theme={baselightTheme}>
              <CssBaseline />

              <HelmetProvider>{children}</HelmetProvider>
            </ThemeProvider>
          </RootQueryClientProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
