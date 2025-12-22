import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.trim().toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(CountryMapper.mapRestCountryItemsToCountryArray),
      catchError((error) => {
        console.error('Error fetching countries by capital:', error);
        return throwError(() => new Error(`No country with that capital was found ${query}`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(CountryMapper.mapRestCountryItemsToCountryArray),
      delay(2000),
      catchError((error) => {
        console.error('Error fetching countries by name:', error);
        return throwError(() => new Error(`No country with that name was found ${query}`));
      })
    )
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined>{

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(CountryMapper.mapRestCountryItemsToCountryArray),
      map( countries => countries.at(0)),
      delay(2000),
      catchError((error) => {
        console.error('Error fetching countries by name:', error);
        return throwError(() => new Error(`No country with that name was found ${code}`));
      })
    )
  }
}
