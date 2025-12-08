import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAdd {

  name = signal('');
  power = signal(0);

  addCharacter() {
    if(!this.name() || !this.power() || this.power() <= 0) return;

    const newCharacter: Character = {
      // id: this.characters().length + 1,
      id: 0,
      name: this.name(),
      powerLevel: this.power()
    }

    // this.characters.update((characters) => [...characters, newCharacter]);
    console.log({newCharacter});
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
