import { isEmptyString } from './type'

// TODO: Refactor it in more functional approach
export function generateStringFromValues(length: number, possibleValues: string): string | undefined {
  if (length <= 0) {
    return undefined
    // throw Error('length must be positive number!')
  }
  if (isEmptyString(possibleValues)) {
    return undefined
    // throw Error('possibleValues must be provided!')
  }

  let text = ''

  for (let i = 0; i < length; i++) {
    text += possibleValues.charAt(Math.floor(Math.random() * possibleValues.length))
  }

  return text
}

export const generateString = (length: number): string =>
  generateStringFromValues(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')!

export function generateElementId(): string {
  const numbersLength = 17
  const lettersLength = 2
  const randLetters = generateStringFromValues(lettersLength, 'abcdefghijklmnopqrstuvwxyz')!
  const randNumbers = generateStringFromValues(numbersLength, '0123456789')!
  return `${randLetters}_${randNumbers}`
}
