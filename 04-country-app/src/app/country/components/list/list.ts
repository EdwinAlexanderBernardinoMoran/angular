import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {
}
