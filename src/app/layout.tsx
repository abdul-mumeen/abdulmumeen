import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeRegistry } from "../theme/ThemeRegistry";
import ownerDetails from "../contexts/ownerDetails.json";

export const metadata: Metadata = {
  title: ownerDetails.site.title,
  description: ownerDetails.site.description,
  keywords: ownerDetails.site.keywords,
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
          <ThemeRegistry>{children}</ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
