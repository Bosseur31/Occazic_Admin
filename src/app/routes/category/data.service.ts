import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from "@core";


export interface Cat {
  _id: string;
  name: string;
  function: string;
  marge: number;
  picture: string;
  timestamps: number;
}

export interface Val {
  _id: string;
  name: string;
  array: boolean;
  category: string;
  timestamps: number;
}

@Injectable()
export class CategoryDataService {

  catList: Cat[] = [];
  valList: Val[] = [];

  private _catUrl = 'http://localhost:3000/category';
  private _valUrl = 'http://localhost:3000/val_func';
  private _selectUrl = 'http://localhost:3000/array_val';
  private headers = new HttpHeaders({'Authorization':this._token.getBearerToken()});

  constructor(public _httpClient: HttpClient, private _token: TokenService) {}

  getData() {
    return this._httpClient.get<Cat[]>(this._catUrl, {headers: this.headers})
  }

  delData(id: string) {
    return this._httpClient.delete(this._catUrl + '/' + id, {headers: this.headers})
  }

  delVal(id: string) {
    return this._httpClient.delete(this._valUrl + '/category/' + id, {headers: this.headers})
  }

  postCat(formData: any) {
    return this._httpClient.post<Cat[]>(this._catUrl, formData, {headers: this.headers})
  }

  postVal(name: string, array: boolean, catId: string) {
    const body = {name: name, array: array, catID: catId};
    return this._httpClient.post<Val[]>(this._valUrl, body, {headers: this.headers})
  }

  postSelect(name: string, value: number, valId: string) {
    const body = {name: name, value: value, val_func_id: valId};
    return this._httpClient.post(this._selectUrl, body, {headers: this.headers})
  }

}
