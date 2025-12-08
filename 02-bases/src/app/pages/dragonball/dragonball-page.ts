import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  powerLevel: number;
}

@Component({
  selector: 'app-dragonball',
  imports: [NgClass],
  templateUrl: './dragonball-page.html',
})
export class DragonballPage {
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
}
