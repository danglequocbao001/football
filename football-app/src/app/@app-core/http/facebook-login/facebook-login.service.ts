import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APICONFIG } from '../@http-config/api';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadingService } from '../../utils';

import { Facebook } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: 'root',
})
export class FacebookLoginService {
  constructor(
    private router: Router, 
    private toastController: ToastController,
    private facebook: Facebook,
    private loadingServie: LoadingService,
    private http: HttpClient
  ) { }
    loginViaFacebook(request: any) {
    return this.http.post<any>(`${APICONFIG.FACEBOOK.POST}`, request).pipe(
      map((result)=>{
        return result
      }),
      catchError((errorRes)=>{
        return errorRes.error
      })
    )
  }
}
