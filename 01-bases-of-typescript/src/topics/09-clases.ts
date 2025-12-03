export class Person{

    constructor(public name: string, private address: string = 'No address')
    {}
}

export class Hero extends Person {
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
    ){
        super(realName, 'New yourk, USA');
    }
}

const iroman = new Hero('Iroman', 45, 'Tony Stark');

console.log(iroman); // Edwin
// console.log(iroman.address); // Error: Property 'address' is private and only accessible within class 'Person'.