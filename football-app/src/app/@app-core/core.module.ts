import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IntercepterService } from './http-interceptor';
import { API_URL } from './http/@http-config';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment.prod';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { ConnectivityService } from './utils/connectivity.service';
import { DateTimeService, LoadingService, ToastService } from './utils';
import { FavoriteService, MiniGameService, NewsService } from './http';
import { ScoreService } from './http/score';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders<unknown> {
    return {
      ngModule: CoreModule,
      providers: [
        ToastService,
        { provide: API_URL, useValue: environment.apiUrl },
        { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true },
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        StorageService,
        ConnectivityService,
        LoadingService,
        DateTimeService,
        FavoriteService,
        NewsService,
        MiniGameService,
        ScoreService
      ]
    };
  }
}
