import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { LoadingService, requestQuery } from 'src/app/@app-core/utils';

@Injectable()
export class CompetitionService {

  constructor(
    private http: HttpClient,
    public loadingServie: LoadingService
  ) { }
    public getAllCompetitions(request) {
      return this.http.get<any>(`${APICONFIG.COMPETITIONS.GET}?${(requestQuery(request))}`).pipe(
        map((result) => {
          return result;
        }),
        catchError((errorRes: any) => {
          throw errorRes.error;
        })
      );
    }
    public subscribe(request) {
      return this.http.post<any>(`${APICONFIG.COMPETITIONS.SUB}`, request).pipe(
        map((result) => {
          return result;
        }),
        catchError((errorRes: any) => {
          throw errorRes.error;
        })
      );
    }
    public unsubscribe(request) {
      return this.http.delete<any>(`${APICONFIG.COMPETITIONS.UNSUB}?${requestQuery(request)}`).pipe(
        map((result) => {
          return result;
        }),
        catchError((errorRes: any) => {
          throw errorRes.error;
        })
      );
    }
    public getAllTeams(request) {
      return this.http.get<any>(`${APICONFIG.COMPETITIONS.GET_TEAM}?${(requestQuery(request))}`).pipe(
        map((result) => {
          return result;
        }),
        catchError((errorRes: any) => {
          throw errorRes.error;
        })
      );
    }
   public getAllCountries(){
     return this.http.get(APICONFIG.COUNTRY.GET).pipe(
       map((result=>{
         return result;
       })),
       catchError((errorRes: any) => {
         throw errorRes.error;
       })
     )
   }
   public getAllWithSubscribe(request){
     return this.http.get<any>(`${APICONFIG.COMPETITIONS.ALL_WITH_SUBSCRIBE}?${(requestQuery(request))}`).pipe(
       map((result=>{
         return result;
       })),
       catchError((errorRes: any) => {
         throw errorRes.error;
       })
     )
   }
  public getAllInternation(request) {
    return this.http.get<any>(`${APICONFIG.COMPETITIONS.INTERNATION}?${(requestQuery(request))}`).pipe(
      map((result => {
        return result;
      })),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    )
  }
  public search(request) {
    return this.http.get<any>(`${APICONFIG.COMPETITIONS.SEARCH}?${(requestQuery(request))}`).pipe(
      map((result => {
        return result;
      })),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    )
  }
}
