import { MissionUtils } from "@woowacourse/mission-utils";
import {StringCalculator} from "./StringCalculator.js";

class App {
  async run() {
    const input = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n')

    if(typeof input !== 'string') throw new Error("[ERROR] 입력값이 문자열이 아닙니다.")

    const result = new StringCalculator(input).parseDelimiter().validateInput().calculate()

    MissionUtils.Console.print(`결과 : ${result}`)
  }
}

export default App;