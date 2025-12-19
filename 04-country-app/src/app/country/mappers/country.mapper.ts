import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries";

export class CountryMapper {
  static mapRestCountrytoCountry(item: RESTCountry): Country{
    return {
      cca2: item.cca2,
      flag: item.flag,
      flagSvg: item.flags.svg,
      name: item.name.common,
      capital: item.capital.join(', '),
      population: item.population
    }
  }

  static mapRestCountryItemsToCountryArray(items: RESTCountry[]): Country[]{
    return items.map(this.mapRestCountrytoCountry);
  }
}

