export class Person{

    constructor(
        public firstName: string,
        public lastName: string,
        private address: string = 'No address'
    )
    {}
}

// Primera forma de heredar
/*
export class Hero extends Person {
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
    ){
        super(realName, 'New yourk, USA');
    }
}
*/

// Segunda forma de heredar
export class Hero{
    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person

    ){
    }
}

const tony = new Person('Tony', 'Stark', 'New yourk, USA');
const iroman = new Hero('Iroman', 45, 'Tony Stark', tony);

console.log(iroman); // Edwin
// console.log(iroman.address); // Error: Property 'address' is private and only accessible within class 'Person'.