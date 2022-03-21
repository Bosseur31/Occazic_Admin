import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from "@core";
import {environment} from "environments/environment";

export interface Estim {
  _id: string;
  name: string;
  surname: string;
  mail: string;
  mobile: number;
  product_category_id: [
    _id: string,
    name: string,
    function: string,
    marge: number
  ];
  input_func_id: string;
  calcul_id: [
    propose_price: number
  ];
  timestamps: number;
}

@Injectable()
export class EstimateDataService {

  estimList: Estim[] = [];

  private _estimUrl = environment.apiURL + '/price_estim';
  private _calculUrl = environment.apiURL + '/calcul';
  private _inputUrl = environment.apiURL + '/input_func/price_estimate';
  private headers = new HttpHeaders({'Authorization':this._token.getBearerToken()});

  constructor(public _httpClient: HttpClient, private _token: TokenService) {
  }
  getData(){
    return this._httpClient.get<Estim[]>(this._estimUrl, {headers: this.headers})
  }

  delData(id: string){
    return this._httpClient.delete(this._estimUrl + '/' + id, {headers: this.headers})
  }

  delCalcul(id: string){
    return this._httpClient.delete(this._calculUrl + '/' + id, {headers: this.headers})
  }

  delInput(id: string){
    return this._httpClient.delete(this._inputUrl + '/' + id, {headers: this.headers})
  }

}
