import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private USERS_API = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<Array<User>>(this.USERS_API);
  }

  save(user: User) {
    return this.http.post<User>(this.USERS_API, user);
  }

}
