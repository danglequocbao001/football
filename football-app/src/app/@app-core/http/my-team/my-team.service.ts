import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { LoadingService, requestQuery } from 'src/app/@app-core/utils';

@Injectable()
export class myTeamService {

  constructor(
    private http: HttpClient,
    public loadingServie: LoadingService
  ) { }
    public getAllMyTeam(request) {
      return this.http.get<any>(`${APICONFIG.MYTEAM.GET_LIST_MATCH}?${(requestQuery(request))}`).pipe(
         map((result) =>{
          return result
        }),
        catchError((errorRes: any) =>{
          throw errorRes.error
        })
      );
    }
    public getDetailMatch(request) {
      return this.http.get<any>(`${APICONFIG.MYTEAM.GET_MATCH_DETAIL}?${(requestQuery(request))}`).pipe(
        map((result) =>{
         return result
       }),
       catchError((errorRes: any) =>{
         throw errorRes.error
       })
     );
    }
   public getRankTeam(request) {
      return this.http.get<any>(`${APICONFIG.MYTEAM.GET_RANK}?${requestQuery(request)}`).pipe(
        map((result)=>{
          return result
        }),
        catchError((errorRes: any) =>{
          throw errorRes
        })
      )
   } 
 
   public getListMatchLive(request) {
    return this.http.get<any>(`${APICONFIG.MYTEAM.GET_LIST_LIVE}?${(requestQuery(request))}`).pipe(
      map((result) =>{
       return result
     }),
     catchError((errorRes: any) =>{
       throw errorRes.error
     })
   );
   }
   public getInfoPlayer(request)  {
    return this.http.get<any>(`${APICONFIG.MYTEAM.GET_PLAYER}?${(requestQuery(request))}`).pipe(
      map((result) =>{
       return result
     }),
     catchError((errorRes: any) =>{
       throw errorRes.error
     })
   );
   }
   public getNewsMatch(request)  {
    return this.http.get<any>(`${APICONFIG.MYTEAM.GET_NEWS_MATCH}?${(requestQuery(request))}`).pipe(
      map((result) =>{
       return result
     }),
     catchError((errorRes: any) =>{
       throw errorRes.error
     })
   );
   }
  
}
