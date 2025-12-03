export interface Product {
    description: string;
    price: number;
}

interface TaxCalculationOptions {
    products: Product[];
    tax: number;
}

const phone: Product = {
    description: 'Smartphone',
    price: 150.0,
}

const tablet: Product = {
    description: 'Tablet',
    price: 250.0,
}

export const taxtCalculation = (options: TaxCalculationOptions): [number, number] => {

    const { products, tax } = options;
    let total = 0;
    products.forEach( ({ price }) => {
        total += price;
    });

    return [total, total * tax];
}

const shoppingCart = [phone, tablet];
const tax = 0.15;

const [total, taxAmount] = taxtCalculation({
    products: shoppingCart,
    tax,
})

console.log('Total: ', total);
console.log('Tax: ', taxAmount);

export {};