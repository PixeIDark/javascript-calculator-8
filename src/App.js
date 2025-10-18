import { MissionUtils } from "@woowacourse/mission-utils";

// 커스텀 구분자 존재하면 그것을 기준으로 삼고, 없으면 기본 구분자를 기준으로한다
class App {
  async run() {
    let input = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n')
    // 1. 입력 string 아닌 경우 예외 처리
    if(typeof input !== 'string') throw new Error("[ERROR]")

    // 2. 커스텀 구분자가 있는지(단일 문자만 가능. 아닐 시 예외 처리) 확인. 있으면 변수에 할당 없으면 기본 구분자 할당
    const validChars = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])
    let delimiter = /[,;]/

    if(input.includes("//")) {
      const customDelimiterMatch = input.match(/^\/\/(.)\\n/)
      if(!customDelimiterMatch) throw new Error("[ERROR]")

      delimiter = customDelimiterMatch[1]
      input = input.substring(customDelimiterMatch[0].length)
      validChars.add(delimiter)
    } else {
      validChars.add(",")
      validChars.add(";")
    }

    // 3. 입력 구분자와 숫자를 제외한 나머지가 들어간 경우 예외 처리. 단, "."은 소수점으로 쓰인 경우 용인함(양수로 구성된 문자열 조건)
    input = input.split(delimiter)
    console.log({input})

    let sum = 0
    // input 의 각 요소가 Number(input) 시, isNAN 이면 예외 처리해야함
    for(const str of input) {
      if(str === "") throw new Error("[ERROR]")

      if(/^\d+(\.\d+)?$/.test(str) === false) throw new Error("[ERROR]")

      const num = Number(str)
      sum += num
    }

    // 4. 3번 과정에서 동시에 누적합도 진행. 소수점 .5 || 5. 예외처리
    MissionUtils.Console.print(`결과 : ${sum}`)
  }
}

export default App;