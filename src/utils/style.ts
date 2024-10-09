import { twMerge } from 'tailwind-merge'
import { ClassValue, clsx } from 'clsx'

// Reference to https://www.youtube.com/watch?v=re2JFITR7TI
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
