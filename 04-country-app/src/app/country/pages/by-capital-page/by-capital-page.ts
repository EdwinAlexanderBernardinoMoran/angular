import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { List } from '../../components/list/list';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, List],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {

  countryService = inject(CountryService);
  onSearch(query: string) {
    console.log({ query });

    this.countryService.searchByCapital(query).subscribe(countries => {
      console.log(countries)
    })
  }
}
