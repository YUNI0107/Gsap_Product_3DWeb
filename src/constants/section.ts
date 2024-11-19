export const SECTION_TYPE = Object.freeze({
  LANDING: 'landing',
  TRANSITION: 'transition',
  ABOUT: 'about',
})

export type SectionType = (typeof SECTION_TYPE)[keyof typeof SECTION_TYPE]
