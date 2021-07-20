import { myTeamService } from './../@app-core/http/my-team/my-team.service';
import { LanguageConstants } from './../@app-core/modular/ng-p-language/common.language';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NewsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { HttpHeaders } from '@angular/common/http'
import { IPageRequest } from '../@app-core/http/global'
import { IonInfiniteScroll, Platform } from '@ionic/angular'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage
  slideOpts = {
    centeredSlides: true,
    loop: true,
    autoplay: true
  };

  headers = new HttpHeaders()
  headersParam = null
  @ViewChild(IonInfiniteScroll) infinityScrollNews: IonInfiniteScroll


  public pageResult: IPageRequest = {
    page: 1,
    per_page: 5,
  }
  param = {
    news_action: {
      news_id: null,
      action_type: ""
    }
  }
  active: boolean;
  listNews = []
  bannerData = []
  device
  id
  match
  img: any
  newActive = true
  private backButton: any
  paramNews = {
    league_name: '',
    hometeam_name: '',
    awayteam_name: '',
    page: 1,
    per_page: 5
  }
  constructor(
    private newsService: NewsService,
    private loadingService: LoadingService,
    private router: Router,
    private platform: Platform,
    private myTeamService: myTeamService,
    private newService: NewsService

  ) { }
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.reset();
    this.id = localStorage.getItem('id-macth-detail');
    this.getData();

    if (localStorage.getItem('device') == 'true') {
      this.device = true
      this.getActiveNews()
      this.infinityScrollNews.disabled = true

    } else {
      this.device = false
      this.getNewsMatch()
    }

  }
  getActiveNews() {
    this.newService.getActiveNewsInScore().subscribe(data => {
      this.newActive = data?.active
      if (this.newActive) {
        this.getNewsMatch()
      }else {
        return
      }
    },
      (error) => {
        throw error
      })
  }
  getData() {
    let param = {
      match_id: this.id
    }
    this.myTeamService.getDetailMatch(param).subscribe((data: any) => {
      this.match = data
      this.handleStatusMatch(this.match)
      this.loadingService.dismiss()
    })
  }
  reset() {
    this.paramNews.page = 1
    this.listNews = []
  }
  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribe(() => {
    })
  }
  ionViewWillLeave() {
    this.backButton.unsubscribe()
  }

  formatTime(value) {
    if (localStorage.getItem('language') == 'Vietnamese') return moment(new Date(value)).lang("vi").fromNow()
    if (localStorage.getItem('language') == 'English') return moment(new Date(value)).lang("en").fromNow()
  }

  getNewsMatch() {
    this.paramNews.league_name = localStorage.getItem('league-name-macth')
    this.paramNews.hometeam_name = localStorage.getItem('hometeam_name')
    this.paramNews.awayteam_name = localStorage.getItem('awayteam_name')
    this.myTeamService.getNewsMatch(this.paramNews).subscribe(data => {
      this.loadingService.dismiss()
      if (data.news.length > 0) {
        this.paramNews.per_page++
        this.infinityScrollNews.complete()
        this.listNews = this.listNews.concat(data.news)
        this.listNews.forEach((i: any) => {
          if (i.like) {
            i.img = 'assets/img/news/like-active.svg'
          } else {
            i.img = 'assets/img/news/like.svg'
          }
        })

        if (this.listNews.length >= data.total_objects) {
          this.infinityScrollNews.disabled = true
        } else {
          this.infinityScrollNews.disabled = false
        }
      }
      else {
        this.getDataNews();
      }
    })
  }

  getDataNews() {
    this.newsService.getAll(this.pageResult).subscribe((data: any) => {
      this.loadingService.dismiss();
      this.pageResult.page++
      this.infinityScrollNews.complete()
      this.listNews = this.listNews.concat(data.news)
      this.listNews.forEach((i: any) => {
        if (i.like) {
          i.img = 'assets/img/news/like-active.svg'
        } else {
          i.img = 'assets/img/news/like.svg'
        }
      })
      if (this.listNews.length >= data.total_objects) {
        this.infinityScrollNews.disabled = true
      } else {
        this.infinityScrollNews.disabled = false
      }
    })
  }

  loadMoreNews() {
    this.getNewsMatch()
  }
  toggleActionNews(news) {
    this.param.news_action.news_id = news.id
    if (!news.like) {
      news.like = true
      news.like_count++
      news.img = 'assets/img/news/like-active.svg'
      this.param.news_action.action_type = "like"
      this.newsService.action(this.param).subscribe()
    } else {
      news.like_count--
      news.like = false
      news.img = 'assets/img/news/like.svg'
      this.param.news_action.action_type = "dislike"
      this.newsService.action(this.param).subscribe(() => { }
        , (error) => {
          throw error
        })
    }
  }
  toggleActionLike(item) {
    this.param.news_action.news_id = item.id
    if (!item.like) {
      item.like = true
      item.img = 'assets/img/news/like-active.svg'
      item.imgDislike = 'assets/img/news/dislike.svg'
      this.param.news_action.action_type = "like"
      this.newsService.action(this.param).subscribe()
    } else {
      item.like = false
      item.img = 'assets/img/news/like.svg'
      this.newsService.actionCancel(this.param).subscribe(() => { },
        (error) => {
          throw error
        })
    }

  }
  toggleActionDisLike(item) {
    this.param.news_action.news_id = item.id
    if (!item.dislike) {
      item.dislike = true
      item.img = 'assets/img/news/like.svg'
      item.imgDislike = 'assets/img/news/dislike-active.svg'
      this.param.news_action.action_type = "dislike"
      this.newsService.action(this.param).subscribe(() => { },
        (error) => {
          throw error
        })
    } else {
      item.dislike = false
      item.imgDislike = 'assets/img/news/dislike.svg'
      this.newsService.actionCancel(this.param).subscribe(() => { }, (error) => {
        throw error
      })
    }
  }
  gotoDetail(id) {
    this.router.navigate(['/news/detail/'], {
      queryParams: {
        id: JSON.stringify(id)
      }
    })
  }
  goBack() {
    this.router.navigateByUrl('/score');
  }

  timeConvert(time) {
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
  handleStatusMatch(list) {
    list.forEach(m => {
      if (m.match_status == 'Finished' ||
        m.match_status == 'After ET' ||
        m.match_status == 'After Pen.') {
        m.imgStatus = './../assets/img/played.svg'
        m.status = 'played'
      } else if (m.match_status == '' || m.match_status == 'FRO') {
        m.imgStatus = '../../assets/img/willplay.svg'
        m.status = 'will-play'
      } else if (m.match_status == 'Cancelled' || m.match_status == 'Postponed') {
        m.imgStatus = '../../assets/img/cancle.svg'
        m.status = 'cancle'
      } else {
        m.imgStatus = '../../assets/img/playing.svg'
        m.status = 'playing'
      }
    });
  }
  convertRound(round) {
    localStorage.getItem('language') == 'Vietnamese' ? round = this.dataLanguage.ROUND + round.substring(5, 7) : round = round;
    return round
  }
  convertDay(day) {
    if (localStorage.getItem('language') == 'Vietnamese') {
      day = day.substring(8, 10) + '/' + day.substring(5, 7) + '/' + day.substring(0, 4);
    } else {
      day = day.split('-').join('/')
    }
    return day
  }
}
