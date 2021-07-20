import { FacebookLoginService } from './@app-core/http/facebook-login/facebook-login.service';
import { File } from '@ionic-native/file/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingService } from './@app-core/utils';
import { CoreModule } from './@app-core';
import { CompetitionService, UtilsApi, AuthService, AccountService } from './@app-core/http';
import { myTeamService } from './@app-core/http/my-team';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgPLanguageService } from './@app-core/modular/ng-p-language/ng-p-language.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CoreModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UtilsApi,
    CompetitionService,
    LoadingService,
    myTeamService,
    AuthService,
    AccountService,
    AndroidPermissions,
    Ng2SearchPipeModule,
    SplashScreen,
    StatusBar,
    File,
    NgPLanguageService, 
    Facebook,
    FacebookLoginService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
