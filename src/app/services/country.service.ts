import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countriesApi = 'http://localhost:8080/api/countries/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Country[]> {
    return this.http.get<Array<Country>>(this.countriesApi);
  }

  getById(id: string): Observable<Country> {
    return this.http.get<Country>(this.countriesApi.concat(id));
  }

  getByName(countryName: string): Observable<Country> {
    return this.http.get<Country>(this.countriesApi.concat(`filter?name=${countryName}`));
  }

  save(country: Country) {
    return this.http.post<Country>(this.countriesApi, country);
  }

  update(country: Country) {
    return this.http.put<Country>(this.countriesApi, country);
  }

  delete(country: Country) {
    return this.http.delete<Country>(this.countriesApi.concat(country.id.valueOf()));
  }

}
