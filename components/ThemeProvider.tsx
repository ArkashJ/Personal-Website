'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemeProvider
    attribute="data-theme"
    defaultTheme="dark"
    enableSystem
    storageKey="arkash-theme"
  >
    {children}
  </NextThemeProvider>
)

export default ThemeProvider
