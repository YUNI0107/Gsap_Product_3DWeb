import blueTitleImage from '@assets/images/landing/blue-title.png'
import greenTitleImage from '@assets/images/landing/green-title.png'
import pinkTitleImage from '@assets/images/landing/pink-title.png'

export const THEME_TYPE = Object.freeze({
  BLUE: 'blue',
  GREEN: 'green',
  PINK: 'pink',
})

export type ThemeType = (typeof THEME_TYPE)[keyof typeof THEME_TYPE]

export const landingThemeContent = {
  [THEME_TYPE.BLUE]: {
    image: blueTitleImage,
    title:
      '高速CPUとGPU、卓越した性能。業界最速の処理速度で、全てのタスクをサクサクこなそう。',
  },
  [THEME_TYPE.GREEN]: {
    image: greenTitleImage,
    title:
      '最先端の冷却技術で、安定したパフォーマンスを長時間維持し、快適に使用可能。',
  },
  [THEME_TYPE.PINK]: {
    image: pinkTitleImage,
    title: 'スリムでスタイリッシュなデザイン、強力な拡張性と高い耐久性を実現。',
  },
}
