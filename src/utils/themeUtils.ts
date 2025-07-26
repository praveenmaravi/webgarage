// src/utils/themeUtils.ts

type ThemeType = 'light' | 'dark' | 'custom'

export interface Theme {
  name: ThemeType
  primaryColor: string
  background: string
  text: string
  accent: string
  border: string
  isDark: boolean
}

const defaultThemes: Record<ThemeType, Theme> = {
  light: {
    name: 'light',
    primaryColor: '#4F46E5',
    background: '#ffffff',
    text: '#111827',
    accent: '#E0E7FF',
    border: '#E5E7EB',
    isDark: false,
  },
  dark: {
    name: 'dark',
    primaryColor: '#6366F1',
    background: '#1F2937',
    text: '#F9FAFB',
    accent: '#3B82F6',
    border: '#374151',
    isDark: true,
  },
  custom: {
    name: 'custom',
    primaryColor: '#FF5A5F',
    background: '#0d0d0d',
    text: '#ffffff',
    accent: '#FFB6B9',
    border: '#3a3a3a',
    isDark: true,
  },
}

export function getTheme(themeName: ThemeType): Theme {
  return defaultThemes[themeName]
}

export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return

  const root = document.documentElement
  root.style.setProperty('--color-primary', theme.primaryColor)
  root.style.setProperty('--color-background', theme.background)
  root.style.setProperty('--color-text', theme.text)
  root.style.setProperty('--color-accent', theme.accent)
  root.style.setProperty('--color-border', theme.border)

  if (theme.isDark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  localStorage.setItem('webgarage-theme', JSON.stringify(theme))
}

export function loadSavedTheme(): Theme {
  if (typeof window === 'undefined') return getTheme('light')

  const saved = localStorage.getItem('webgarage-theme')
  if (saved) {
    try {
      return JSON.parse(saved) as Theme
    } catch {
      return getTheme('light')
    }
  }
  return getTheme('light')
}

export function generateThemeFromColor(baseColor: string): Theme {
  // Simple logic for now; you can use HSL for advanced themes
  return {
    name: 'custom',
    primaryColor: baseColor,
    background: '#0e0e0e',
    text: '#ffffff',
    accent: lightenColor(baseColor, 30),
    border: lightenColor(baseColor, 60),
    isDark: true,
  }
}

// Utility: Lighten a hex color
function lightenColor(hex: string, percent: number) {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}
