import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Box, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";
import NavBar from "./NavBar";

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
      <body>
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
