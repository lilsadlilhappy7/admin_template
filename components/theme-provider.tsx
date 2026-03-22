'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"   // ✅ FORCE LIGHT MODE
      enableSystem={false}   // ✅ ignore system dark mode
    >
      {children}
    </NextThemesProvider>
  )
}