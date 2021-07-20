import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/@app-core/utils';

@Injectable()
export class MiniGameService {
  headers
  constructor(
    private http: HttpClient,
    public loadingServie: LoadingService
  ) { }
  public getAll() {
    return this.http.get<any>(`${APICONFIG.MINIGAME.GET}?`).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }
  public getAllIos() {
    return this.http.get<any>(`${APICONFIG.MINIGAME.GET_IOS}?`).pipe(
      map((result) => {
        return result
      }),
      catchError((errorRes: any) => {
        throw errorRes.error
      })
    );
  }




}
