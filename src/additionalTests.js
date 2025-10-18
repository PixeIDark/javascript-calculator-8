import App from "./App.js";
import { MissionUtils } from "@woowacourse/mission-utils";

const mockQuestions = (inputs) => {
    MissionUtils.Console.readLineAsync = jest.fn();
    MissionUtils.Console.readLineAsync.mockImplementation(() => {
        const input = inputs.shift();
        return Promise.resolve(input);
    });
};

const getLogSpy = () => {
    const logSpy = jest.spyOn(MissionUtils.Console, "print");
    logSpy.mockClear();
    return logSpy;
};

const testCases = [
    // 기본 기능
    { input: "", expected: "0", shouldError: false },
    { input: "5", expected: "5", shouldError: false },
    { input: "1,2", expected: "3", shouldError: false },
    { input: "1,2,3", expected: "6", shouldError: false },
    { input: "1,2,3,4,5,6,7,8,9", expected: "45", shouldError: false },

    // 기본 구분자: 쉼표(,)와 콜론(:)
    { input: "1:2", expected: "3", shouldError: false },
    { input: "10:20:30", expected: "60", shouldError: false },

    // 혼합
    { input: "1,2:3", expected: "6", shouldError: false },
    { input: "1:2,3:4,5", expected: "15", shouldError: false },

    // 커스텀 구분자
    { input: "//;\\n1;2;3", expected: "6", shouldError: false },
    { input: "//*\\n1*2*3", expected: "6", shouldError: false },
    { input: "//#\\n5#10#15", expected: "30", shouldError: false },
    { input: "//|\\n1|1|1|1", expected: "4", shouldError: false },
    { input: "//-\\n999-888-777", expected: "2664", shouldError: false },

    // 0 포함
    { input: "0,1,2", expected: "3", shouldError: false },
    { input: "0", expected: "0", shouldError: false },
    { input: "0,0,0", expected: "0", shouldError: false },

    // 큰 숫자
    { input: "10,20,30", expected: "60", shouldError: false },
    { input: "100,200,300", expected: "600", shouldError: false },
    { input: "1000,2000", expected: "3000", shouldError: false },
    { input: "999999,1", expected: "1000000", shouldError: false },

    // 공백 포함 - Number(" 2") = 2로 자동 변환되므로 정상 작동
    { input: "1, 2, 3", expected: "6", shouldError: false },

    // 빈 값 - Number("") = 0이므로 정상 작동
    { input: ",", expected: "0", shouldError: false },
    { input: "1,,3", expected: "4", shouldError: false },
    { input: "1::3", expected: "4", shouldError: false },
    { input: ",5", expected: "5", shouldError: false },
    { input: "5,", expected: "5", shouldError: false },

    // 예외 - 음수 (- 기호가 validChars에 없음)
    { input: "-1,2,3", expected: null, shouldError: true },
    { input: "-1.5,2", expected: null, shouldError: true },
    { input: "-5", expected: null, shouldError: true },

    // 예외 - 잘못된 형식 (문자)
    { input: "1,a,3", expected: null, shouldError: true },
    { input: "1,@,3", expected: null, shouldError: true },
    { input: "abc", expected: null, shouldError: true },
    { input: "일,이,삼", expected: null, shouldError: true },

    // 예외 - 소수점 (. 기호가 validChars에 없음)
    { input: "1.5,2.5", expected: null, shouldError: true },
    { input: "0.1,0.2,0.3", expected: null, shouldError: true },
    { input: "1,2.5,3", expected: null, shouldError: true },
    { input: "0.1,0.2", expected: null, shouldError: true },
    { input: ".", expected: null, shouldError: true },
    { input: ".5,2", expected: null, shouldError: true },
    { input: "5.,2", expected: null, shouldError: true },
    { input: "10,10.", expected: null, shouldError: true },
    { input: ".5:10", expected: null, shouldError: true },
    { input: "5.:10", expected: null, shouldError: true },
    { input: "1..5,2", expected: null, shouldError: true },
    { input: "1.2.3,5", expected: null, shouldError: true },
    { input: "1.2.3.4", expected: null, shouldError: true },

    // 예외 - 기본 구분자가 아닌 세미콜론
    { input: "1;2;3", expected: null, shouldError: true },
    { input: "1,2;3,4", expected: null, shouldError: true },
    { input: "1,2:3;4", expected: null, shouldError: true },

    // 예외 - 기본 구분자가 아닌 다른 구분자
    { input: "1#2#3", expected: null, shouldError: true },

    // 예외 - 커스텀 구분자 형식 오류
    { input: "//", expected: null, shouldError: true },
    { input: "//:1:2:3", expected: null, shouldError: true },
    { input: "//,\\n", expected: "0", shouldError: false },
    { input: "//,\\n1,,", expected: "1", shouldError: false },
    { input: "//,,:\\n1,,", expected: null, shouldError: true },

    // 예외 - 기타
    { input: "1,2:3,4", expected: "10", shouldError: false },
];

export const additionalTests = () => {
    describe("문자열 계산기", () => {
        testCases.forEach(({ input, expected, shouldError }) => {
            const testName = `입력: "${input}" ${shouldError ? "예외" : `→ ${expected}`}`;

            test(testName, async () => {
                mockQuestions([input]);
                const app = new App();

                if (shouldError) {
                    await expect(app.run()).rejects.toThrow("[ERROR]");
                } else {
                    const logSpy = getLogSpy();
                    await app.run();
                    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
                }
            });
        });
    });
};

additionalTests()