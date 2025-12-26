import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { List } from '../../components/list/list';
import { CountryService } from '../../services/country.service';
import { of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'country-by-country-page',
  imports: [SearchInput, List],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ByCountryPage {
  countryService = inject(CountryService);
  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  // 1. Tomamos el valor del query param 'query' de la URL
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  // 2. Asignamos el query param a una linkedSignal
  query = linkedSignal(() => this.queryParam);
  errorMessage = signal<string | null>(null);

  countryResource = rxResource({
    params: () => ({query: this.query()}),

    stream: ({ params }) => {
      console.log({'query': params.query});
      this.errorMessage.set(null);

      if (!params.query) return of([]);
      this.router.navigate(['/country/by-country'], {
        queryParams: { query: params.query }
      });

      return this.countryService.searchByCountry(params.query).pipe(
        tap(countries => {
          if (countries.length === 0) {
            this.errorMessage.set(`No se encontró ningún país con el nombre: ${params.query}`);
          }
        })
      );
    }
  })

  // // Forma de hacerlo con resource retornando una Promesa
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     // Toma el primer valor emitido por el Observable y lo convierte en una Promesa
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     )
  //   }
  // })
}
