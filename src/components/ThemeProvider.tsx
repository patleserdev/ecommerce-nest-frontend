'use client'
import { ReactNode } from "react";
import { Attribute, ThemeProvider as NextThemesProvider } from 'next-themes'

// On définit explicitement le type des props qu’on veut pouvoir passer
interface CustomThemeProviderProps {
  children: ReactNode;
  attribute?: Attribute;
  defaultTheme?: string;
  enableSystem?: boolean;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
}: CustomThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;