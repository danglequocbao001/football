import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config';
import { catchError, map } from 'rxjs/operators';
import { LoadingService } from 'src/app/@app-core/utils';

@Injectable()
export class UtilsApi {

  constructor(
    private http: HttpClient,
    public loadingServie: LoadingService
  ) { }
  public saveDeviceID(req) {
    return this.http.post(`${APICONFIG.DEVICES.GET}`, req).pipe(
      map((result) => {
        return result;
      },
        catchError((error) => {
          throw error;
        })
      )
    )
  }

  public checkDeviceId(req) {
    return this.http.get(`${APICONFIG.DEVICES.CHECK(req)}`).pipe(
      map((result: any) => {
        return result;
      }),
      catchError((errorRes: any) => {
        throw errorRes.error;
      }))
  }

  public getCountries() {
    return this.http.get(`${APICONFIG.COUNTRY.GET}`,).pipe(
      map((result) => {
        return result;
      },
        catchError((error) => {
          throw error;
        })
      )

    )
  }

  public generateDeviceID() {
    return this.http.get(`${APICONFIG.DEVICES.GENERATE}`).pipe(
      map((result) => {
        return result;
      },
        catchError((error) => {
          throw error;
        })
      )
    )
  }

}
