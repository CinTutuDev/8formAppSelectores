import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { Region, SmallCountry } from '../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  public countriesByRegion: SmallCountry[] = [];
  public borders: SmallCountry[] = [];

  public myForm: FormGroup = this.formB.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    borders: ['', [Validators.required]],
  });

  constructor(
    private formB: FormBuilder,
    private countriesS: CountriesService
  ) {}
  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }

  get regions(): Region[] {
    return this.countriesS.regions;
  }

  onRegionChange(): void {
    this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => (this.borders = [])),
        switchMap((region) => this.countriesS.getCountryByRegion(region))
      )
      .subscribe((countries) => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChange(): void {
    this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('borders')!.setValue('')),
        filter((value: string) => value.length > 0),
        switchMap((code) => this.countriesS.getCountryByAlphaCode(code)),
        switchMap((country) =>
          this.countriesS.getCOuntryBordersCodes(country.borders)
        )
      )
      .subscribe((countries) => {
        console.log({ borders: countries });
        this.borders = countries;
      });
  }
}
