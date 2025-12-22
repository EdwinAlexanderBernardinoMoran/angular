import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'loading',
  imports: [],
  templateUrl: './loading.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loading { }
