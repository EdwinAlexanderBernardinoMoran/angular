const addNumbers = (a: number, b: number): number => {
    return a + b;
}

const addNumbersTwo = (a: number, b: number): string => `${a + b}`;

const multiplyNumbers = (firstNumber: number, secondNumbers?: number, base: number = 2): number => firstNumber * base;

const result: number = addNumbers(1, 2);
const resultTwo: string = addNumbersTwo(1, 2);
const multiplyResult: number = multiplyNumbers(5);

console.log({result, resultTwo, multiplyResult});

export {}