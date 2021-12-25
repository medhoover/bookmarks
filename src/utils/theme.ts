import { writable } from 'svelte/store'

export type ThemeColor = 'system' | 'dark' | 'light'

const isSystemSchemeDark = () => window?.matchMedia('(prefers-color-scheme: dark)').matches

export const isDarkModeEnabled = (theme: ThemeColor) => {
  switch (theme) {
    case 'dark': {
      return true
    }
    case 'light': {
      return false
    }
    default: {
      return isSystemSchemeDark()
    }
  }
}

export const themeColor = writable(localStorage.theme || ('system' as ThemeColor))

themeColor.subscribe((theme) => {
  switch (theme) {
    case 'dark': {
      localStorage.theme = theme
      break
    }
    case 'light': {
      localStorage.theme = theme
      break
    }
    default: {
      localStorage.removeItem('theme')
    }
  }

  if (theme !== 'light' && isSystemSchemeDark()) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
