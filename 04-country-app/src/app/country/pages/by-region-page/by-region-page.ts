import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { List } from "../../components/list/list";
import { Region } from '../../interfaces/region.interface';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  };

  return validRegions[queryParam.toLowerCase()] ?? 'Americas'
}

@Component({
  selector: 'country-by-region-page',
  imports: [List],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByRegionPage {

  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  query = linkedSignal<Region|null>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource({
    params: () => ({query: this.query()}),

    stream: ({ params }) => {
      if (!params.query) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: { query: params.query }
      });

      return this.countryService.searchByRegion(params.query);
    }
  })
}
