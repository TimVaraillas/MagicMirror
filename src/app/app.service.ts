import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class AppService {


  constructor(private http: Http) { }

  getEphemeris(): Observable<any> {
    return this.http.get('assets/json/ephemeris.json')
      .map((res) => res.json())
      .catch((error) => error);
  }

}
