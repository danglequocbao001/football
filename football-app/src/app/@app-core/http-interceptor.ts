import { Observable, throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { API_URL } from './http/@http-config';
@Injectable()
export class IntercepterService implements HttpInterceptor {
  constructor(
    @Inject(API_URL) private apiUrl: string,
    private router: Router,
  ) { }
  count: number = 0;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var request = req.clone({
      url: this.prepareUrl(req.url)
    });
    // if (localStorage.getItem('Authorization') !== null) {
    //   request = req.clone({
    //     url: this.prepareUrl(req.url),
    //     // headers: req.headers("Access-Control-Allow-Origin", "*"),
    //     headers: req.headers.set('Authorization', localStorage.getItem('Authorization') || '')
    //       .set('Accept', 'multipart/form-data')
    //   });
    // }
    // else if (localStorage.getItem('device-key') !== null) {
    //   request = req.clone({
    //     url: this.prepareUrl(req.url),
    //     headers: req.headers.set('device-key', localStorage.getItem('device-key'))
    //   });
    // }
    request = req.clone({
      url: this.prepareUrl(req.url),
      headers: req.headers
      .set('Authorization', localStorage.getItem('Authorization') || 'null')
      .set('device-key', localStorage.getItem('device-key') || 'null')
      .set('Accept', 'multipart/form-data')
    });
    return next.handle(request)
      .pipe(
        catchError((res) => {
          if (res instanceof HttpErrorResponse) {
            if (res.status === 401) {
              this.count++;
            }
            // if(this.count == 3) {
            //   this.count = 0;
            //   this.router.navigateByUrl('/auth/login', { queryParams: { returnUrl: window.location.pathname } });
            //   localStorage.clear();
            // }
            return throwError(res);
          }
        }));
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.apiUrl + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}

