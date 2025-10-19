import { MissionUtils } from "@woowacourse/mission-utils";
import {StringCalculator} from "./StringCalculator.js";

class App {
  async run() {
    const input = await MissionUtils.Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n')

    if(typeof input !== 'string') throw new Error("[ERROR]")

    const result = new StringCalculator(input).parseDelimiter().validateInput().calculate()

    MissionUtils.Console.print(`결과 : ${result}`)
  }
}

export default App;