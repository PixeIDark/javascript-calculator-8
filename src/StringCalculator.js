const DEFAULT_DELIMITER = /[,:]/g
const DEFAULT_VALID_CHARS = new Set(["0","1","2","3","4","5","6","7","8","9"," ",",",":"])

export class StringCalculator {
  constructor(input, delimiter = DEFAULT_DELIMITER, validChars = DEFAULT_VALID_CHARS) {
    this.input = input
    this.delimiter = delimiter
    this.validChars = validChars
  }

  parseDelimiter() {
    if(!this.input.includes("//"))  return new StringCalculator(this.input, /[,:]/g, this.validChars)

    const customDelimiterMatch = this.input.match(/^\/\/(.)(?:\\n|\r?\n)/)

    if(!customDelimiterMatch) throw new Error("[ERROR] 커스텀 구분자 형식이 올바르지 않습니다.")

    const newDelimiter = customDelimiterMatch[1]
    const newInput = this.input.substring(customDelimiterMatch[0].length)
    const newValidChars = new Set(this.validChars)
    newValidChars.add(newDelimiter)

    return new StringCalculator(newInput, newDelimiter, newValidChars)
  }

  validateInput() {
    const isInvalid = this.input.split("").some(char => !this.validChars.has(char))

    if(isInvalid) throw new Error("[ERROR] 허용되지 않은 문자가 포함되어 있습니다.")

    return new StringCalculator(this.input, this.delimiter, this.validChars)
  }

  calculate() {
    const numbers = this.input.split(this.delimiter).filter(str => str.trim() !== "")

    return numbers.reduce((acc, str) => acc + Number(str), 0)
  }
}