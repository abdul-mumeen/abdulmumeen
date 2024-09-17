import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import theme from "@/theme/theme";
import NavBar from "./NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Abdul-Mumeen",
  description: "All about Abdul-Mumeen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppRouterCacheProvider options={{ key: "css", enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Box
              display="flex"
              height="100%"
              width="100%"
              bgcolor="#F8F7F1"
              color="#0D2F3F"
            >
              <Box flex={1} />
              <Box flexGrow={2} maxWidth="69rem">
                <NavBar />
                {children}
              </Box>
              <Box flex={1} />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
