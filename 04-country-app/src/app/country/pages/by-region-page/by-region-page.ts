import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'country-by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByRegionPage {

  countryService = inject(CountryService);
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  query = signal<Region|null>(null);

  countryResource = rxResource({
    params: () => ({query: this.query()}),

    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.countryService.searchByRegion(params.query);
    }
  })
}
