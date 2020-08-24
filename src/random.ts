export function generateStringFromValues(length: number, possibleValues: string): string | undefined {
  if (length <= 0) {
    return undefined
    //throw Error('length must be positive number!')
  }
  if (possibleValues === undefined || possibleValues.length === 0) {
    return undefined
    //throw Error('possibleValues must be provided!')
  }

  let text = ""

  for (let i = 0; i < length; i++) {
    text += possibleValues.charAt(Math.floor(Math.random() * possibleValues.length))
  }

  return text
}

export function generateString(length: number): string | undefined {
  return generateStringFromValues(length, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
}

export function generateElementId(): string | undefined {
  const numbersLength = 17
  const lettersLength = 2
  return generateStringFromValues(lettersLength, "abcdefghijklmnopqrstuvwxyz") + '_' + generateStringFromValues(numbersLength, "0123456789")
}
