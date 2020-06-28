import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../models/country.model';
import {City} from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {


  private citiesApi = 'http://localhost:8080/api/cities';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<City[]> {
    return this.http.get<Array<City>>(this.citiesApi);
  }

  getById(cityId: number): Observable<Country> {
    return this.http.get<Country>(this.citiesApi.concat(String(cityId)));
  }

  getByCountryName(countryName: string): Observable<City[]> {
    return this.http.get<City[]>(this.citiesApi.concat(`/filter?country=${countryName}`));
  }

  save(city: City): Observable<City> {
    return this.http.post<City>(this.citiesApi, city);
  }

  update(city: City) {
    return this.http.put<Country>(this.citiesApi, city);
  }

  delete(city: City) {
    return this.http.delete<Country>(this.citiesApi.concat(city.id.valueOf()));
  }
}
