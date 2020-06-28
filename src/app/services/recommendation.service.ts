import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../models/country.model';
import {City} from '../models/city.model';
import {Recommendation} from '../models/recommendation.model';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {


  private recommendationsApi = 'http://localhost:8080/api/recommendations';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<City[]> {
    return this.http.get<Array<City>>(this.recommendationsApi);
  }

  getById(recommendationId: number): Observable<Country> {
    return this.http.get<Country>(this.recommendationsApi.concat(String(recommendationId)));
  }

  getByCityName(cityName: string): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(this.recommendationsApi.concat(`/filter?city=${cityName}`));
  }

  save(recommendation: Recommendation) {
    return this.http.post<Recommendation>(this.recommendationsApi, recommendation);
  }

  update(recommendation: Recommendation) {
    return this.http.put<Recommendation>(this.recommendationsApi, recommendation);
  }

  delete(recommendation: Recommendation) {
    return this.http.delete<Recommendation>(this.recommendationsApi.concat(recommendation.id.valueOf()));
  }
}
