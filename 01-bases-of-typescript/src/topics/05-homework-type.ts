/*
    ===== Código de TypeScript =====
*/

interface SuperHero {
    name: string;
    age: number;
    address: Address;
    showAddress: () => string;
}

interface Address {
    street: string;
    pais: string;
    ciudad: string;
}

const superHeroe: SuperHero = {
    name: 'Spiderman',
    age: 30,
    address: {
        street: 'Main St',
        pais: 'USA',
        ciudad: 'NY'
    },
    showAddress() {
        return this.name + ', ' + this.address.ciudad + ', ' + this.address.pais;
    }
}

const address = superHeroe.showAddress();
console.log( address );

export {};