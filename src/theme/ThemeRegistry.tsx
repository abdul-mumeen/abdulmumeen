"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  useState,
  useMemo,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Inter } from "next/font/google";
import { OwnerDetailsProvider } from "../contexts/OwnerDetailsContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// Extend the theme interface to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    blue: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    green: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }

  interface PaletteOptions {
    blue?: {
      50?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
    };
    green?: {
      50?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
    };
  }
}

const lightPalette = {
  primary: {
    main: "#22c55e",
  },
  background: {
    default: "#ffffff",
    paper: "#F9FAFB",
  },
  text: {
    primary: "#1f2937",
    secondary: "#6b7280",
  },
  divider: "#e5e7eb",
  blue: {
    50: "#E3F2FD",
    100: "#BBDEFB",
    200: "#90CAF9",
    300: "#64B5F6",
    400: "#42A5F5",
    500: "#2196F3",
    600: "#1E88E5",
    700: "#1976D2",
    800: "#1565C0",
    900: "#0D47A1",
  },
  green: {
    50: "#E8F5E8",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#4CAF50",
    600: "#43A047",
    700: "#388E3C",
    800: "#2E7D32",
    900: "#1B5E20",
  },
};

const darkPalette = {
  primary: {
    main: "#4ade80",
  },
  background: {
    default: "#111827",
    paper: "#1F2937",
  },
  text: {
    primary: "#f3f4f6",
    secondary: "#9ca3af",
  },
  divider: "#374151",
  blue: {
    50: "#0D47A1",
    100: "#1565C0",
    200: "#1976D2",
    300: "#1E88E5",
    400: "#2196F3",
    500: "#42A5F5",
    600: "#64B5F6",
    700: "#90CAF9",
    800: "#BBDEFB",
    900: "#E3F2FD",
  },
  green: {
    50: "#1B5E20",
    100: "#2E7D32",
    200: "#388E3C",
    300: "#43A047",
    400: "#4CAF50",
    500: "#66BB6A",
    600: "#81C784",
    700: "#A5D6A7",
    800: "#C8E6C9",
    900: "#E8F5E8",
  },
};

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

interface ThemeRegistryProps {
  children: ReactNode;
}

type ThemeMode = "light" | "dark";

export function ThemeRegistry({ children }: ThemeRegistryProps) {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("1colorMode") as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
    }
    setIsHydrated(true);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        console.log("Toggle color mode");
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("1colorMode", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        typography: {
          fontFamily: inter.style.fontFamily,
        },
        palette: {
          mode,
          ...(mode === "light" ? lightPalette : darkPalette),
        },
      }),
    [mode]
  );

  if (!isHydrated) {
    return null; // Or a loading spinner if preferred
  }

  return (
    <OwnerDetailsProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </OwnerDetailsProvider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  return context;
}
