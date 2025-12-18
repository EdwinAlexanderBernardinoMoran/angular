import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {
  inputByCapital = signal('');

  byCapital = output<string>();
  placeholder = input.required<string>();

  searchByCapital(){
    if (this.inputByCapital().length === 0) return;

    const byCapital: string = this.inputByCapital();
    this.byCapital.emit(byCapital);
    this.resetField();
  }

  resetField(){
    this.inputByCapital.set('');
  }
}
