// Arreglos
const skills: string[] = ['Bash, Git', 'JavaScript', 'TypeScript'];

// Interfaces
interface Character {
    name: string;
    hp: number;
    skills: string[];

    // Indicamos que este campo es opcional
    hometown?: string;
}

// Objetos
const strider: Character = {
    name: 'Strider',
    hp: 14,
    skills: ['Bash, Git', 'JavaScript', 'TypeScript'],
}

strider.hometown = 'Rivendell';

console.log()
console.table(skills);

export {};