import { create } from 'zustand'
import { THEME_TYPE, ThemeType } from '../constants/theme'

interface State {
  currentTheme: ThemeType
  updateThemeType: (theme: ThemeType) => void
}

const useStore = create<State>((set) => ({
  currentTheme: THEME_TYPE.BLUE,
  updateThemeType: (theme) => set({ currentTheme: theme }),
}))

export default useStore
