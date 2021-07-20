import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/@app-core/utils';

@Injectable()
export class FavoriteService {
  headers
  constructor(
    private http: HttpClient,
    public loadingServie: LoadingService
  ) { }
  public getTeamsFavorite(headers) {
    return this.http.get<any>(`${APICONFIG.FAVORITE.GET_TEAM}`, {headers: headers}).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public getLeagueFavorite(headers) {
    return this.http.get<any>(`${APICONFIG.FAVORITE.GET_LEAGUE}`, {headers: headers}).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public getLeaguePlayers(headers) {
    return this.http.get<any>(`${APICONFIG.FAVORITE.GET_PLAYER}`, {headers: headers}).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public noti(request, headers) {
    return this.http.put<any>(`${APICONFIG.FAVORITE.NOTI}`, request, {headers: headers}).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public notiAll(request, headers) {
    return this.http.put<any>(`${APICONFIG.FAVORITE.NOTI_ALL}`, request, {headers: headers}).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public suggestionTeam() {
    return this.http.get<any>(`${APICONFIG.FAVORITE.SUGGESTION_TEAM}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public suggestionLeague() {
    return this.http.get<any>(`${APICONFIG.FAVORITE.SUGGESTION_LEAGUE}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
  public suggestionPlayer() {
    return this.http.get<any>(`${APICONFIG.FAVORITE.SUGGETION_PLAYER}`).pipe(
      map((result) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      })
    );
  }
 


}
