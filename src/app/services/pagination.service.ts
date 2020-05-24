import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private http: HttpClient) {
  }

  getPage(baseApi: string, pageRequest: PageRequest): Observable<Page<any>> {
    const url = baseApi.concat(
      `?page=${pageRequest.page}&size=${pageRequest.size}&sort=${pageRequest.sortBy},${pageRequest.sortStrategy}`);
    return this.http.get<Page<any>>(url);
  }

}
