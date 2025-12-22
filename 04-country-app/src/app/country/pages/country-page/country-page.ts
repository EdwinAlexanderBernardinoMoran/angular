import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { Loading } from "../../../shared/components/loading/loading";
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'country-page',
  imports: [NotFound, Loading, CountryInformation],
  templateUrl: './country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPage {

  countryService = inject(CountryService)
  countryCode = inject(ActivatedRoute).snapshot.params['code'];

  countryResoruce = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    }
  })
}
