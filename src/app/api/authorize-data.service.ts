import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeDataService {

  private AUTHORIZE_API = 'http://localhost:8080/api/authorize';

  constructor(private http: HttpClient) {
  }

  login(login: Login) {
    return this.http.post<User>(this.AUTHORIZE_API.concat('/login'), login);
  }

}
