import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgPLanguageService } from './@app-core/modular/ng-p-language/ng-p-language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ngPLanguageService: NgPLanguageService
  ) {
    // this.ngPLanguageService.loadFileLanguage();
    this.ngPLanguageService.loadFileLanguage().subscribe(data => {
    },
      (error) => {
        throw error
      });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        localStorage.setItem('device', 'true')  
      }else {
        localStorage.setItem('device', 'false')
      }
      this.statusBar.backgroundColorByHexString('#ffffff');
      this.statusBar.styleDefault();
   
        this.splashScreen.hide();
  
      this.platform.backButton.subscribeWithPriority(1, () => { // to disable hardware back button on whole app
      });
    });
  }

}