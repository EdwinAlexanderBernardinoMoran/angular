import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { List } from '../../components/list/list';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInput, List],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCountryPage {
  onSearch(value: string) {
    console.log('Valor emitido');

    console.log({ value });
  }
}
