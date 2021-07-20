import { LanguageConstants } from './../@app-core/modular/ng-p-language/common.language';
import { LoadingService } from './../@app-core/utils/loading.service';
import { UtilsApi } from './../@app-core/http/utilsApi/utilsApi.service';
import { Component, OnDestroy, OnInit, } from '@angular/core'
import { Router } from '@angular/router'
// import { OneSignal } from '@ionic-native/onesignal/ngx'
import { AlertController, ModalController, Platform } from '@ionic/angular'
import { CompetitionService } from '../@app-core/http'
import { PopupCountryComponent } from '../@app-core/modular/popup-country/popup-country.component'
import { NgPLanguageComponent } from '../@app-core/modular/ng-p-language/ng-p-language.component';
import { NgPLanguageService } from '../@app-core/modular/ng-p-language/ng-p-language.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  // device_id = '5af57365-d47c-4f17-bae0-06447b6d8f72ic'
  dataLanguage = LanguageConstants.dataLanguage;
  device_id = ''
  token_id = ''
  onseSignalAppId = '8024fa47-acad-4afd-b0c7-dcc7a8c444cb'
  googleProjectId = 'football-310607'
  countries = []
  imgCountry = 'https://apiv2.apifootball.com/badges/logo_country/157_vietnam.png'
  itemCountry;
  itemLanguage;
  param: any = {}
  handleServiceLanguage: any;
  selectedLanguage = ''
  device
  constructor(
    private modalCtrl: ModalController,
    private competitionService: CompetitionService,
    private router: Router,
    // public oneSignal: OneSignal,
    private platform: Platform,
    private utilsapi: UtilsApi,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private ngPLanguageService: NgPLanguageService,
  ) {
    this.handleLanguage();
  }

  ngOnInit() {
    localStorage.getItem('country_id') ? localStorage.getItem('country_id') : localStorage.setItem('country_id', '157')
    this.param = {
      subscribe_source: {
        sourceable_id: parseInt(localStorage.getItem('country_id')) || 157,
        sourceable_type: "Country",
        device_key: localStorage.getItem('device-key')
      }
    }
    this.initDeviceID();
    if (localStorage.getItem('timeZone') == null) {
      localStorage.setItem('timeZone', '24')
    }
  } 
  ionViewWillEnter() {
    if(localStorage.getItem('device') == 'true') {
      this.device = true
    }else {
      this.device = false
    }
  }

  handleLanguage() {
    this.handleServiceLanguage = this.ngPLanguageService.getLanguage.subscribe((data) => {
      this.dataLanguage = data;

      this.selectedLanguage = this.ngPLanguageService.getSelectedLanguage();

    })
  }
  initCountries() {
    this.itemLanguage = localStorage.getItem('language');
    this.param = {
      subscribe_source: {
        sourceable_id: parseInt(localStorage.getItem('country_id')) || 157,
        sourceable_type: "Country",
        device_key: localStorage.getItem('device-key')
      }
    }
    this.utilsapi.getCountries().subscribe((data: any) => {
      this.countries = data
      let tempCountries = [];
      for (let country of this.countries) {
        if (
          country.country_name == 'Vietnam' ||
          country.country_name == 'England' ||
          country.country_name == 'Portugal' ||
          country.country_name == 'Spain' ||
          country.country_name == 'Germany' ||
          country.country_name == 'Italy' ||
          country.country_name == 'France') {
          tempCountries.push(country);
          const index = this.countries.indexOf(country);
          this.countries.splice(index, 1)
        }
      }
      this.countries = tempCountries.concat(this.countries);
      const temp = localStorage.getItem('country_id');
      this.itemCountry = this.countries.find(x => x.country_id == temp);
      this.loadingService.dismiss()
    }, () => {
      this.loadingService.dismiss()
    })
  }
  initDeviceID() {
    this.loadingService.present();
    if (localStorage.getItem('device-key') == null) {
      localStorage.removeItem('home_redirect')
      this.utilsapi.generateDeviceID().subscribe((data: any) => {
        localStorage.setItem('device-key', data.key)
        this.checkDeviceId(data.key)
      })
    }
    else {
      this.checkDeviceId(localStorage.getItem('device-key'));
    }
  }

  checkDeviceId(param) {
    this.initCountries();
    this.utilsapi.checkDeviceId(param).subscribe((data) => {
      if (data.message == 'Ok!') {
        if (localStorage.getItem('isClicked') != 'true') this.usedDevice();
        else if (localStorage.getItem('home_redirect') == 'true') this.router.navigateByUrl('/score');
      }
      else if (data.message == 'Bad!') this.saveDeviceID();
    })
  }

  saveDeviceID() {
    localStorage.removeItem('home_redirect')
    let paramsID = {
      "device": {
        "key": localStorage.getItem('device-key')
      }
    }
    this.utilsapi.saveDeviceID(paramsID).subscribe(() => {
      localStorage.setItem('isClicked', 'true');
    }, (error) => {
      throw error
    })
  }
  async usedDevice() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: this.dataLanguage.USED_DEVICE,
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: this.dataLanguage.CONTINUE,
          handler: () => {
            localStorage.setItem('isClicked', 'true');
            this.router.navigateByUrl('/score');
          }
        }
      ]
    });

    await alert.present();
  }
  getTokenID() {
    // if (this.platform.is('android')) {
    //   this.oneSignal.startInit(this.onseSignalAppId, this.googleProjectId)
    // }
    // else if (this.platform.is('ios')) {
    //   this.oneSignal.startInit(this.onseSignalAppId)
    // }
    // // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification)

    // // this.oneSignal.handleNotificationReceived().subscribe(() => {
    // // })
    // // this.oneSignal.handleNotificationOpened().subscribe(result => {
    // // })
    // this.oneSignal.endInit()
    // this.oneSignal.getIds().then(identity => {
    //   this.token_id = identity.pushToken
    //   this.device_id = identity.userId
    //   this.saveDeviceID()
    // })
  }
  async selectedCountry() {
    this.loadingService.present();
    const popover = await this.modalCtrl.create({
      component: PopupCountryComponent,
      swipeToClose: true,
      cssClass: 'modalCoutry',
      componentProps: {
        countryItem: this.itemCountry,
        data_country: this.countries
      }
    });
    popover.onDidDismiss()
      .then((data) => {
        const country = data['data'];
        this.itemCountry = (country !== undefined) ? country : this.itemCountry ;
        this.param.subscribe_source.sourceable_id = localStorage.getItem('country_id')
        this.subCountry()
      });

    return await popover.present();
  }
  subCountry() {
    this.competitionService.subscribe(this.param).subscribe(
      (data) => {
      }, (error) => {
        throw error
      })
  }
  gotoTournaments() {
    if (localStorage.getItem('country_id') == null) {
      localStorage.setItem('country_id', '157')
      this.param.subscribe_source.sourceable_id = 157
      this.subCountry()
    }
    this.router.navigateByUrl('/tournaments')
  }
  // async selectLanguage() {
  //   const popover = await this.modalCtrl.create({
  //     component: PopupLanguageComponent,
  //     swipeToClose: true,
  //     cssClass: 'modalCoutry',
  //     componentProps: {
  //       itemLanguage: this.itemLanguage,
  //     }
  //   });
  //   popover.onDidDismiss()
  //     .then((data) => {
  //       const language = data['data']; // Here's your selected user!
  //       this.itemLanguage = language;
  //     });

  //   return await popover.present();
  // }

  async selectLanguage() {
    const popover = await this.modalCtrl.create({
      component: NgPLanguageComponent,
      swipeToClose: true,
      cssClass: 'modalCoutry',
      componentProps: {
        itemLanguage: this.itemLanguage,
      }
    });
    popover.onDidDismiss()
      .then((data) => {

        const language = data['data']; // Here's your selected user!

        this.itemLanguage = language;
      });

    return await popover.present();
  }

  ngOnDestroy() {
    this.handleServiceLanguage.unsubscribe();
  }
}

