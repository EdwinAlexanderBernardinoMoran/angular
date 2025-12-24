import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { List } from '../../components/list/list';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, List],
  templateUrl: './by-capital-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {

  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() =>this.queryParam);

  countryResource = rxResource({
    params: () => ({ query: this.query()}),

    stream: ({ params }) => {
      console.log({'query': params.query});

      if (!params.query) return of([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams: { query: params.query }
      });

      return this.countryService.searchByCapital(params.query);
    }
  });

  // // Forma de hacerlo con resource retornando una Promesa
  // countryResource = resource({
  //   params: () => ({ query: this.query()}),
  //   loader: async ({params}) => {
  //     if (!params.query) return [];

  //     // Toma el primer valor emitido por el Observable y lo convierte en una Promesa
  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(params.query)
  //     )
  //   }
  // })

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {

  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       console.log(err);

  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(err);
  //     },
  //   })
  // }
}
