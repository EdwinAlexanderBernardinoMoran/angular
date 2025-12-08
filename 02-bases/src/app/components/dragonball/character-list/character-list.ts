import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragon-character-list',
  templateUrl: './character-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterList {
  characters = input.required<Character[]>()
}
