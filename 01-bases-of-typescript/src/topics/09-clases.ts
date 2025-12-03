export class Person{
    public name: string;
    private address: string;

    constructor(){
        this.name = 'Edwin';
        this.address = 'Unknown';
    }
}

const iroman = new Person();

console.log(iroman.name); // Edwin
console.log(iroman.address)
// console.log(iroman.address); // Error: Property 'address' is private and only accessible within class 'Person'.