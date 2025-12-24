import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {
  placeholder = input.required<string>();
  initialValue = input<string>();

  byCapital = output<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  searchByCapital(query: string) {
    if (query.length === 0) return;
    this.byCapital.emit(query);
  }

  // Se dispara cada vez que el valor del input cambia
  debounceEffect = effect((onCleanup) => {

    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.byCapital.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
}
