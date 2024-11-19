import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { THEME_TYPE, ThemeType } from '../constants/theme'
import { SECTION_TYPE, SectionType } from '../constants/section'

interface State {
  currentTheme: ThemeType
  updateThemeType: (theme: ThemeType) => void
  section: SectionType
  updateSection: (section: SectionType) => void
  transitionScrollY: number
  updateTransitionScrollY: (value: number) => void
}

const useStore = create<State>()(
  subscribeWithSelector((set) => ({
    currentTheme: THEME_TYPE.BLUE,
    updateThemeType: (theme) => set({ currentTheme: theme }),

    section: SECTION_TYPE.LANDING,
    updateSection: (section) => set({ section }),

    transitionScrollY: 0,
    updateTransitionScrollY: (value) => set({ transitionScrollY: value }),
  })),
)

export default useStore
