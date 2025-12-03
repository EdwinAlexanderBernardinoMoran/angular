export const whatsMyType = <T>(argument: T): T => {
    return argument;
}

const amIString = whatsMyType<string>("Hello, Generics!");
const amINumber = whatsMyType<number>(42);
const amIBoolean = whatsMyType<boolean>(true);
const amIArray = whatsMyType<number[]>([1, 2, 3, 4, 5]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed(2));
console.log(amIBoolean.valueOf());
console.log(amIArray.join('-'));