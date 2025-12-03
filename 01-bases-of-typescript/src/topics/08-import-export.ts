import { Product, taxtCalculation } from "./07-function-destructuring";

const shoppingCart: Product[] = [
    {
        description: 'Laptop',
        price: 1200.0,
    },
    {
        description: 'Monitor',
        price: 300.0,
    },
];

const [ total, taxAmount ] = taxtCalculation({
    products: shoppingCart,
    tax: 0.15
})

console.log('Total: ', total)
console.log('Tax: ', taxAmount)