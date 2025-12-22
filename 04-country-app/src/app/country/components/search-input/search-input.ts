import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {
  inputValue = signal('');

  byCapital = output<string>();
  placeholder = input.required<string>();

  searchByCapital(query: string) {
    if (query.length === 0) return;
    this.byCapital.emit(query);
  }

  // Se dispara cada vez que el valor del input cambia
  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.byCapital.emit(this.inputValue());
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
}
