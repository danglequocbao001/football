import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG} from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { LoadingService, requestQuery } from 'src/app/@app-core/utils';

@Injectable()
export class ScoreService {
  headers
  constructor(
    private http: HttpClient,
    public loadingServie: LoadingService
  ) { }


    public getMine(params) {
      return this.http.get<any>(`${APICONFIG.SCORE.GET_MINE}?${(requestQuery(params))}`).pipe(
        map((result) => {
          return result
        }),
        catchError((errorRes: any) => {
          throw errorRes.error
        })
      )}
      public getAll(params) {
        return this.http.get<any>(`${APICONFIG.SCORE.GET_ALL}?${(requestQuery(params))}`).pipe(
          map((result) => {
            return result
          }),
          catchError((errorRes: any) => {
            throw errorRes.error
          })
        )}


}
