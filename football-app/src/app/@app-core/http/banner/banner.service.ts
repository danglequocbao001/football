import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APICONFIG } from '../@http-config/api';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  constructor(
    private http: HttpClient
  ) { }
  public getBanner() {
    return this.http.get(`${APICONFIG.BANNER.GET}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
  public getBannerIos() {
    return this.http.get(`${APICONFIG.BANNER.GET_BANNER_IOS}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
  public checkBannerIos() {
    return this.http.get(`${APICONFIG.BANNER.CHECK_BANNER_IOS}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }));

  }
}
