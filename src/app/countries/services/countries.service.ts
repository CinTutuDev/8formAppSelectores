import { Injectable } from '@angular/core';
import {
  Country,
  Region,
  SmallCountry,
} from '../interfaces/country.interfaces';
import { Observable, combineLatest, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  private _region: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ];

  constructor(private http: HttpClient) {}

  get regions(): Region[] {
    return [...this._region];
  }

  getCountryByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url = `${this.apiUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) =>
        countries.map((country) => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [],
        }))
      )
      /*   tap((resp) => console.log({ resp })) */
    );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url = `${this.apiUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url).pipe(
      map((country) => ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [],
      }))
    );
  }

  getCOuntryBordersCodes(borders: string[]): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of([]);

    const requestCountry: Observable<SmallCountry>[] = [];

    borders.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      requestCountry.push(request);
    });

    return combineLatest(requestCountry);
  }
}
