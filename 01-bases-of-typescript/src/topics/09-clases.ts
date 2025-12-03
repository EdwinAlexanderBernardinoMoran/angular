export class Person{

    constructor(public name: string, private address: string)
    {}
}

const iroman = new Person('Edwin Alexander Bernardino Moran', 'Av. Siempre Viva 742');

console.log(iroman.name); // Edwin
console.log(iroman.address)
// console.log(iroman.address); // Error: Property 'address' is private and only accessible within class 'Person'.