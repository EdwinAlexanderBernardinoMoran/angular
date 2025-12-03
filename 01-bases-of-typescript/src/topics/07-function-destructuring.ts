interface Product {
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

const taxtCalculation = (options: TaxCalculationOptions): number[] => {
    let total = 0;
    options.products.forEach( product => {
        total += product.price;
    });

    return [total, total * options.tax];
}

const shoppingCart = [phone, tablet];
const tax = 0.15;

const result = taxtCalculation({
    products: shoppingCart,
    tax,
})

console.log('Total: ', result[0]);
console.log('Tax: ', result[1]);

export {};