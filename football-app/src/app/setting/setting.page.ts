import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgPLanguageService } from '../@app-core/modular/ng-p-language/ng-p-language.service';
import { NewsService } from '../@app-core/http';

@Component({
  selector: 'app-setting',
  templateUrl: 'setting.page.html',
  styleUrls: ['setting.page.scss']
})
export class SettingPage {
  dataLanguage
  handleServiceLanguage: any;
  selectedLanguage = ''
  footerList = []
  currentRouter: string;
  iconScore;
  iconNews;
  iconFav;
  iconSet;
  device
  newActive
  constructor(
    private ngPLanguageService: NgPLanguageService,
    private router: Router,
    private newService: NewsService

  ) {
    this.handleServiceLanguage = this.ngPLanguageService.getLanguage.subscribe((data) => {
      this.dataLanguage = data;
      this.currentRouter = this.dataLanguage.SCORE;
      this.checkCurrent()
      this.selectedLanguage = this.ngPLanguageService.getSelectedLanguage();
      this.footerList = [
        {
          id: 0,
          title: this.dataLanguage.SCORE,
        },
        {
          id: 1,
          title: this.dataLanguage.NEWS
        },
        {
          id: 2,
          title: this.dataLanguage.FAVOURITE
        },
        {
          id: 3,
          title: this.dataLanguage.SETTINGS
        }
      ]

    })
  }
  ngOnInit() {
   
  }
  ionViewWillEnter() {  
    if(localStorage.getItem('device') == 'true') {
      this.device = true
      this.getActiveNews()
      
    }else {
      this.device = false
    }
  }

  ngOnDestroy() {
    this.handleServiceLanguage.unsubscribe();
  }
  
  check(router) {
    this.currentRouter = router;
    router == 'score' ? this.iconScore = "assets/icon/tab/score-act.svg" : this.iconScore = "assets/icon/tab/score.svg";
    router == 'news' ? this.iconNews = "assets/icon/tab/news-act.svg" : this.iconNews = "assets/icon/tab/news.svg";
    router == 'favorite' ? this.iconFav = "assets/icon/tab/fav-act.svg" : this.iconFav = "assets/icon/tab/fav.svg";
    router == 'setting-account' ? this.iconSet = "assets/icon/tab/set-act.svg" : this.iconSet = "assets/icon/tab/set.svg";
  }
  getActiveNews() {
    this.newService.getActiveNewsInScore().subscribe(data => {
      this.newActive = data.active
    },
      (error) => {
        throw error
      })
  }
  checkCurrent() {
    if (this.router.url == '/setting/score') this.check('score')
    else if (this.router.url == '/setting/news') this.check('news')
    else if (this.router.url == '/setting/favorite') this.check('favorite')
    else if (this.router.url == '/setting/setting-account') this.check('setting-account')
  }
}
