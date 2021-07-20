import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { LoadingService, requestQuery } from 'src/app/@app-core/utils';

@Injectable()
export class NewsService {
  headers
  constructor(
    private http: HttpClient,
    public loadingServie: LoadingService
  ) { }
  public getAll(request) {
    return this.http.get<any>(`${APICONFIG.NEWS.GET}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public getItemDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.NEWS.GET_ID(id)}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes) => { throw errorRes.error; }));
  }
  public getAllTransfer(request) {
    return this.http.get<any>(`${APICONFIG.NEWS.GET_TRANSFER}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public getDetail(id: string) {
    return this.http.get<any>(`${APICONFIG.NEWS.GET_ID}?${(id)}`).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public action(request) {
    return this.http.post<any>(`${APICONFIG.NEWS.ACTION}`, request).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public actionCancel(request) {
    return this.http.post<any>(`${APICONFIG.NEWS.ACTION_CANCEL}`, request).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public getOrther(request) {
    return this.http.get<any>(`${APICONFIG.NEWS.GET_ORTHER}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public getTurnOnFoff(request) {
    return this.http.get<any>(`${APICONFIG.NEWS.GET_ACTIVE}?${(requestQuery(request))}`).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public getFooterNewDetail() {
    return this.http.get<any>(`${APICONFIG.NEWS.GET_FOOTER_NEWS}`).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public getActiveNewsInScore() {
    return this.http.get<any>(`${APICONFIG.NEWS.GET_ACTIVE_NEWS}`).pipe (
      map((result) =>{
        return result
      }),
      catchError((errorRes: any) =>{
        throw errorRes.error
      })
    )
  }
}
