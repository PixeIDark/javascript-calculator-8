  import { MissionUtils } from "@woowacourse/mission-utils";

  // 커스텀 구분자 존재하면 그것을 기준으로 삼고, 없으면 기본 구분자를 기준으로한다
  class App {
    async run() {
      // 1. 입력 string 아닌 경우 예외 처리
      let input = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n')
      if(typeof input !== 'string') throw new Error("[ERROR]")

      // 2. 커스텀 구분자가 있는지(단일 문자만 가능. 아닐 시 예외 처리) 확인. 있으면 변수에 할당 없으면 기본 구분자 할당
      const validChars = new Set(["0","1","2","3","4","5","6","7","8","9",""])
      let delimiter = /[,:]/

      if(input.includes("//")) {
        const customDelimiterMatch = input.match(/^\/\/(.)(?:\\n|\r?\n)/)
        if(!customDelimiterMatch) throw new Error("[ERROR]")

        // delimiter 타입이 다름
        delimiter = customDelimiterMatch[1]
        input = input.substring(customDelimiterMatch[0].length)
        validChars.add(delimiter)
      } else {
        // 이부분 컹스한데 이게 최선인지??
        validChars.add(",")
        validChars.add(":")
      }

      // 3. 입력 구분자와 숫자를 제외한 나머지가 들어간 경우 예외 처리. 단, "."은 양수라 조건은 충족하는데 불가능하게 하는게 맞다 예시에 없잖아
      // 전체 input이 ""인경우는 0 반환하라고 명시, 그렇다면 "5, " 인경우 빈 공백에서 에러 트로우할지 0 반환할지
      const isInvalid = input.split("").some(char => !validChars.has(char))
      // isInvalid 하나로 음수가 아닌지, 소수인지 다 파악하고있는데 맞는지 이방식이
      // 예외에 따른 명확한 에러 메세지 바운딩을 해줄꺼면 이 방식은 틀렸음. 반면 모두 같게할꺼면 이게 간단함
      if(isInvalid) throw new Error("[ERROR]")

      input = input.split(delimiter)
      console.log({input})
      const result = input.reduce((acc, str) => acc + Number(str), 0)

      // 4. 3번 과정에서 동시에 누적합도 진행.
      MissionUtils.Console.print(`결과 : ${result}`)
    }
  }

  export default App;