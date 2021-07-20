import { TimeZonePage } from './time-zone/time-zone.page';
import { FeedbackPage } from './../@app-core/modular/feedback/feedback.page';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, MiniGameService, NewsService } from '../../app/@app-core/http'
import { LanguageConstants } from '../@app-core/modular/ng-p-language/common.language'
import { LoadingService } from '../@app-core/utils';
import { NgPLanguageService } from '../@app-core/modular/ng-p-language/ng-p-language.service';

@Component({
  selector: 'app-setting-account',
  templateUrl: './setting-account.page.html',
  styleUrls: ['./setting-account.page.scss'],
})
export class SettingAccountPage implements OnInit {
  logined: boolean = false;
  name = '';
  url = '';

  url_live = '';
  dataLanguage = LanguageConstants.dataLanguage;
  private backButton: any
  checkLengthLanguage = 0;
  handleServiceLanguage: any;
  selectedLanguage = ''
  device
  avatar = 'assets/img/avatar.png'
  miniGameActive = false
  isLiveActive = false
  miniGameActiveIos
  isLiveActiveIos = false
  newActive = true
  constructor(
    private accountService: AccountService,
    private router: Router,
    private modalCtrl: ModalController,
    private loadingService: LoadingService,
    private alertController: AlertController,
    private platform: Platform,
    private ngPLanguageService: NgPLanguageService,
    private minigame: MiniGameService,
    private newService: NewsService

  ) {
    this.handleServiceLanguage = this.ngPLanguageService.getLanguage.subscribe((data) => {
      this.dataLanguage = data;

      this.selectedLanguage = this.ngPLanguageService.getSelectedLanguage();

    })
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    if (localStorage.getItem('Authorization')) {
      this.logined = true;
      this.loadingService.present()
      this.accountService.getAccounts().subscribe(
        (data) => {
          this.loadingService.dismiss()
          this.name = data.full_name;
        })
    }
    else {
      this.logined = false;
    }
    if (localStorage.getItem('device') == 'true') {
      this.getActiveNews()
      this.device = true
      this.liveStreamIos()

    } else {
      this.device = false
      this.liveStream()

    }
    this.getMiniGame()
  }
  liveStream() {
    this.accountService.getLivestream().subscribe((data) => {
      this.url_live = data.url

      if (data.active == true) {
        this.isLiveActive = true
      } else this.isLiveActive = false
     
    })
  }
  liveStreamIos() {
    this.accountService.getLivStreamIos().subscribe((data) => {
      this.url_live = data.url
      if (data.ios_active == true) {
        this.isLiveActiveIos = true
      } else this.isLiveActiveIos = false
    })
   
  }
  getMiniGame() {
    this.minigame.getAll().subscribe(data => {
      this.miniGameActive = data.active
      if (this.device) {
        this.miniGameActiveIos = data.ios_active
      } else this.miniGameActiveIos = false
    })
  }
  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribe(() => {
    })
  }
  ionViewWillLeave() {
    this.backButton.unsubscribe()
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'logout-alert',
      message: this.dataLanguage.EXIT_APP,
      buttons: [
        {

          text: this.dataLanguage.YES,
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: this.dataLanguage.NO,
          handler: () => {
            alert.dismiss()
            return;
          }
        },
      ]
    });
    await alert.present()
  }
  logOut() {
    localStorage.removeItem('Authorization')
    this.ionViewWillEnter()
  }
  routerLink(routerLink) {
    if (routerLink == '/auth/login') {
      if (!localStorage.getItem('Authorization')) this.router.navigate([routerLink]);
    }
    // else if (routerLink == '/news') {
    //  // this.SettingPage.currentRouter = 'news';
    //   this.router.navigate([routerLink]);
    // }
    else this.router.navigate([routerLink]);
  }

  async openModalFeedback() {
    const modal = await this.modalCtrl.create({
      component: FeedbackPage,
      cssClass: 'feedback-modal',
      swipeToClose: true,
    });
    modal.present();
  }

  async selectTimeZone() {
    const popover = await this.modalCtrl.create({
      component: TimeZonePage,
      swipeToClose: true,
      cssClass: 'modalTimeZone',
      mode: 'ios'
    });
    return await popover.present();
  }


  openLiveStream() {
    window.open(this.url);
  }
  ngOnDestroy() {
    this.handleServiceLanguage.unsubscribe();
  }
  getActiveNews() {
    this.newService.getActiveNewsInScore().subscribe(data => {
      this.newActive = data.active
    },
      (error) => {
        throw error
      })
  }
  gotoPage(item) {
    this.router.navigateByUrl('/' + `${item}`)
  }
}
