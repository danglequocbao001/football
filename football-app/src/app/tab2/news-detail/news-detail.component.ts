import { LanguageConstants } from './../../@app-core/modular/ng-p-language/common.language';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/@app-core/http';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';
import * as moment from 'moment';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  data: any
  dataNews: any;
  headerCustom = { title: this.dataLanguage.NEW_DETAILS };
  footer:any = {}
  footerLinks = [
    {
      name: 'test1',
      link: 'https://facebook.com'
    },
    {
      name: 'test2',
      link: 'https://facebook.com'
    },
    {
      name: 'test3',
      link: 'https://facebook.com'
    }
  ]
  device
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private newsService: NewsService,
    private loadingService: LoadingService
  ) {

  }

  ngOnInit() {
    this.loadingService.present();
    this.route.queryParams.subscribe(params => {
      this.data = params
      this.getItem()
    },
      (error) => {
        throw error
      });
  }
  getItem() {
    this.newsService.getItemDetail(this.data.id).subscribe((data: any) => {
      this.dataNews = data;
      this.loadingService.dismiss();

    },
      (error) => {
        throw error
      });
  }
  formatDate(value) {
    return this.timeConvert(moment(new Date(value)).format("hh:mm,DD-MM-YYYY")) + ' ' + moment(new Date(value)).format("hh:mm,DD-MM-YYYY").slice(5);
  }

  ionViewWillEnter() {
    this.getFooter();
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'none';
    });
    if(localStorage.getItem('device') == 'true') {
      this.device = true
    }else {
      this.device = false
    }
  }
  ngOnDestroy() {
  }
  timeConvert(time) {
    time = time.slice(0, 5)
    if (localStorage.getItem('timeZone') == '12') {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? ' AM' : ' PM';
        time[0] = +time[0] % 12 || 12;
      }
      return time.join('');
    }
    else return time
  }
  getFooter() {
    this.footer = '';
    this.newsService.getFooterNewDetail().subscribe((data) => {
      if(data.active == true) {
        this.footer = data.attachment.content;
      }
    })
  }
}
