import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  powerLevel: number;
}

@Component({
  selector: 'app-dragonball',
  templateUrl: './dragonball-page.html',
})
export class DragonballPage {
  name = signal('DragonBall');
  power = signal(1000);

  characters = signal<Character[]>([
    {
      id: 1,
      name: 'Goku',
      powerLevel: 9001
    },
    {
      id: 2,
      name: 'Vegeta',
      powerLevel: 8000
    },
    {
      id: 3,
      name: 'Piccolo',
      powerLevel: 3000
    },
    {
      id: 4,
      name: 'Frieza',
      powerLevel: 500
    }
  ])

  powerClasses = computed(() => {
    return {
      'text-danger': true
    }
  })

  addCharacter() {
    if(!this.name() || !this.power() || this.power() <= 0) return;

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      powerLevel: this.power()
    }

    this.characters.update((characters) => [...characters, newCharacter]);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
