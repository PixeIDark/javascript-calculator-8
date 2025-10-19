export class StringCalculator {
  constructor(input) {
    this.input = input
    this.validChars = new Set(["0","1","2","3","4","5","6","7","8","9"," "])
    this.delimiter = /[,:]/
  }

  parseDelimiter() {
    if(this.input.includes("//")) {
      const customDelimiterMatch = this.input.match(/^\/\/(.)(?:\\n|\r?\n)/)

      if(!customDelimiterMatch) throw new Error("[ERROR]")

      this.delimiter = customDelimiterMatch[1]
      this.input = this.input.substring(customDelimiterMatch[0].length)
      this.validChars.add(this.delimiter)
    } else this.validChars.add(",").add(":")

    return this
  }

  validateInput() {
    const isInvalid = this.input.split("").some(char => !this.validChars.has(char))

    if(isInvalid) throw new Error("[ERROR]")

    return this
  }

  calculate() {
    const numbers = this.input.split(this.delimiter)

    return numbers.reduce((acc, str) => acc + Number(str), 0)
  }
}
