import { Component, computed, signal } from '@angular/core';
import { CharacterList } from "../../components/dragonball/character-list/character-list";
import { Character } from '../../interfaces/character.interface';
import { CharacterAdd } from '../../components/dragonball/character-add/character-add';

@Component({
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super-page.html',
  imports: [CharacterList, CharacterAdd],
})
export class DragonballSuperPage {
  name = signal('');
  power = signal(0);

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
