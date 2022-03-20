import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Token, User } from './interface';
import {TokenService} from "@core";
import { Menu } from '@core';
import { map } from 'rxjs/operators';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private headers = new HttpHeaders({'Authorization':this._token.getBearerToken()});

  constructor(protected http: HttpClient, private _token: TokenService) {}

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token | any>(environment.apiURL + '/user/login', { username: username, password: password });
  }

  refresh(params: any) {
    return this.http.post<Token | any>('/auth/refresh', params);
  }

  logout(user_id: string) {
    return of({});
  }

  me(user_id: string) {
    return this.http.get<User>(environment.apiURL + '/user/' + user_id, {headers: this.headers});
  }

  menu() {
    return this.http
      .get<{ menu: Menu[] }>('assets/data/menu.json?_t=' + Date.now())
      .pipe(map(res => res.menu));
  }
}
