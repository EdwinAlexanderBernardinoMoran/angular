export interface Passenger {
    name: string;
    children?: string[];
}

const passengerOne: Passenger = {
    name: "Benjamin"
}

const passengerTwo: Passenger = {
    name: "Magdalena",
    children: ["Alexander", "Ernesto"]
}

const printChildren = (passenger: Passenger) => {

    // Esto se le conoce como optional chaining


    const howManyChildren = passenger.children?.length || 0;
    // const howManyChildren = passenger.children!.length; // Non-null assertion operator (Confiar en que no es null ni undefined)

    console.log(howManyChildren);
}

printChildren(passengerOne);
printChildren(passengerTwo);