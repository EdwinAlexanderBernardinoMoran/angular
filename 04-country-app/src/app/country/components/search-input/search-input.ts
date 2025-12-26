import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInput {
  placeholder = input.required<string>();

  // 4. Asignamos el valor inicial que viene desde la URL al input
  initialValue = input<string>();

  byCapital = output<string>();

  // 5. Asignamos el valor del input a la caja de texto del campo de busqueda
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  searchByCapital(query: string) {
    if (query.length === 0) return;
    this.byCapital.emit(query);
  }

  // Se dispara cada vez que el valor del input cambia
  debounceEffect = effect((onCleanup) => {

    const value = this.inputValue();

    const timeout = setTimeout(() => {
      console.log('Debounce effect:', value);
      this.byCapital.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    })
  })
}
