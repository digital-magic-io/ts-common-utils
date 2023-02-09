import { OptionalString } from './type'
import { isEmptyString } from './nullable-utils'

// TODO: Refactor it in more functional approach
/**
 * @param length number of characters in generted string
 * @param possibleValues string of values to generate from
 * @return generated string or undefined if length < 0 or possibleValues is empty
 */
export function generateStringFromValues(length: number, possibleValues: string): OptionalString {
  if (length <= 0) {
    return undefined
  }
  if (isEmptyString(possibleValues)) {
    return undefined
  }

  // eslint-disable-next-line functional/no-let
  let text = ''

  // eslint-disable-next-line functional/no-let,functional/no-loop-statements
  for (let i = 0; i < length; i++) {
    text += possibleValues.charAt(Math.floor(Math.random() * possibleValues.length))
  }

  return text
}

/**
 * @param length number of characters in generated string
 * @return generated string or undefined if length < 0
 */
export const generateString = (length: number): OptionalString =>
  generateStringFromValues(length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789')

export function generateElementId(): string {
  const numbersLength = 17
  const lettersLength = 2
  // eslint-disable-next-line
  const randLetters = generateStringFromValues(lettersLength, 'abcdefghijklmnopqrstuvwxyz')!
  // eslint-disable-next-line
  const randNumbers = generateStringFromValues(numbersLength, '0123456789')!
  return `${randLetters}_${randNumbers}`
}
