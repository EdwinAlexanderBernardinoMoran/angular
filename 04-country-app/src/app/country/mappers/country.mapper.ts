import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries";

export class CountryMapper {
  static mapRestCountrytoCountry(item: RESTCountry): Country{
    return {
      cca2: item.cca2,
      flag: item.flag,
      flagSvg: item.flags.svg,
      name: item.translations['spa'].common ?? 'No spanish name',
      capital: item.capital.join(', '),
      population: item.population,
      region: item.region,
      subregion: item.subregion,
    }
  }

  static mapRestCountryItemsToCountryArray(items: RESTCountry[]): Country[]{
    return items.map(CountryMapper.mapRestCountrytoCountry);
  }
}

