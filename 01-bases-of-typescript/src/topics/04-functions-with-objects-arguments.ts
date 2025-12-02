interface Character {
    name: string;
    hp: number;
    showHp: () => void;
}

const healCharacter = (character: Character, amount: number) => {

    if (character.hp + amount > 100) {
        character.hp = 100;
        console.warn(`${character.name} is fully healed`);
        return;
    }
    character.hp += amount;
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`HP: ${this.hp}`);
    }
};

healCharacter(strider, 20);

strider.showHp();