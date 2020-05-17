import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {

  private COUNTRIES_API = 'http://localhost:8080/api/countries/';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Country[]> {
    return this.http.get<Array<Country>>(this.COUNTRIES_API);
  }

  getPage(pageRequest: PageRequest): Observable<Page<Country>> {
    const url = this.COUNTRIES_API.concat(
      `?page=${pageRequest.page}&size=${pageRequest.size}&sort=${pageRequest.sortBy},${pageRequest.sortStrategy}`);
    return this.http.get<Page<Country>>(url);
  }

  getById(id: string): Observable<Country> {
    return this.http.get<Country>(this.COUNTRIES_API.concat(id));
  }

  save(country: Country) {
    return this.http.post<Country>(this.COUNTRIES_API, country);
  }

  update(country: Country) {
    return this.http.put<Country>(this.COUNTRIES_API, country);
  }

  delete(country: Country) {
    return this.http.delete<Country>(this.COUNTRIES_API.concat(country.id.valueOf()));
  }
}
