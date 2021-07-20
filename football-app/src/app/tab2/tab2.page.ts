import { LoadingService } from './../@app-core/utils/loading.service'
import { Component, ViewChild } from '@angular/core'
import { BannerService, NewsService } from '../@app-core/http'
import { IPageRequest } from '../@app-core/http/global'
import * as moment from 'moment'
import { HttpHeaders } from '@angular/common/http'
import { AlertController, IonInfiniteScroll, Platform } from '@ionic/angular'
import { LanguageConstants } from '../@app-core/modular/ng-p-language/common.language'
import { Router } from '@angular/router'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  dataLanguage = LanguageConstants.dataLanguage
  slideOpts = {
    centeredSlides: true,
    loop: true,
    autoplay: true
  };
  tagNew = 1
  headers = new HttpHeaders()
  headersParam = null
  @ViewChild(IonInfiniteScroll) infinityScrollNews: IonInfiniteScroll
  @ViewChild(IonInfiniteScroll) infinityScrollTranfer: IonInfiniteScroll
  @ViewChild(IonInfiniteScroll) infinityScrollOrther: IonInfiniteScroll


  public pageResult: IPageRequest = {
    page: 1,
    per_page: 5,
  }
  public pageTranfer: IPageRequest = {
    page: 1,
    per_page: 5,
  }
  public pageOrther: IPageRequest = {
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
  listTran = []
  listLikeTranfer = []
  listOrther = []
  bannerData = []
  device
  newActive = true
  private backButton: any
  constructor(
    private newsService: NewsService,
    private loadingService: LoadingService,
    private router: Router,
    private platform: Platform,
    private banner: BannerService,
    private newService: NewsService


  ) { }
  ngOnInit() {
    this.reset()
  }
  ionViewWillEnter() {
    this.loadingService.present()
    this.reset()
    this.getDataOrther()
    this.getDataNews()
    this.getDataTransfer()
    this.getBanner()
    this.turnOffData()

    // const tabs = document.querySelectorAll('ion-tab-bar');
    // Object.keys(tabs).map((key) => {
    //   tabs[key].style.display = 'flex'
    // })
    if (localStorage.getItem('device') == 'true') {
      this.getActiveNews()
      this.device = true
        this.checkBannerIos()
    } else {
      this.device = false
      this.getBanner()
    }
  }
  checkBannerIos() {
    this.banner.checkBannerIos().subscribe(data => {
      if (data.active) {
        this.getBannerIos()
      } else {
        this.bannerData = [];
      }
    })
  }
  getBanner() {
    this.banner.getBanner().subscribe(data => {
      this.bannerData = data;
    },
      (error) => {
        throw error
      });

  }
  getBannerIos() {
    this.banner.getBannerIos().subscribe(data => {
      this.bannerData = data
    })
  }
  reset() {
    this.pageOrther.page = this.pageResult.page = this.pageTranfer.page = 1
    this.listNews = this.listOrther = this.listTran = []
  }
  turnOffData() {
    let paramActive = {
      name: 'other_news'
    }
    this.newsService.getTurnOnFoff(paramActive).subscribe(data => {
      this.active = data.active
    },
      (error) => {
        throw error
      })
  }

  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribe(() => {
    })
  }
  ionViewWillLeave() {
    this.backButton.unsubscribe()
  }
  changeTag(value) {
    this.pageOrther.page = 1
    this.pageTranfer.page = 1
    this.pageResult.page = 1
    this.tagNew = value
  }
  counter(i: number) {
    return new Array(i)
  }
  formatTime(value) {
    if (localStorage.getItem('language') == 'Vietnamese') return moment(new Date(value)).lang("vi").fromNow()
    if (localStorage.getItem('language') == 'English') return moment(new Date(value)).lang("en").fromNow()
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
    }, (error) => {
      throw error
    })
  }
  getDataTransfer() {
    this.newsService.getAllTransfer(this.pageTranfer).subscribe((data: any) => {
      this.listTran = this.listTran.concat(data.news)
      this.loadingService.dismiss();
      this.infinityScrollTranfer.complete()
      this.listTran.forEach((i: any) => {
        if (i.like) {
          i.img = 'assets/img/news/like-active.svg'
        } else {
          i.img = 'assets/img/news/like.svg'
        }
        if (i.dislike) {
          i.imgDislike = 'assets/img/news/dislike-active.svg'
        } else {
          i.imgDislike = 'assets/img/news/dislike.svg'
        }
      })
      this.pageTranfer.page++
      if (this.listTran.length >= data.total_objects) {
        this.infinityScrollTranfer.disabled = true
      } else {
        this.infinityScrollTranfer.disabled = false
      }
    }, (error) => {
      throw error
    })

  }
  getDataOrther() {
    this.newsService.getOrther(this.pageOrther).subscribe((data: any) => {
      // this.loadingService.dismiss()
      this.infinityScrollOrther.complete()
      this.listOrther = this.listOrther.concat(data.news)
      this.listOrther.forEach((i: any) => {
        if (i.like) {
          i.img = 'assets/img/news/like-active.svg'
        } else {
          i.img = 'assets/img/news/like.svg'
        }
      })
      this.pageOrther.page++
      if (this.listOrther.length >= data.total_objects) {
        this.infinityScrollOrther.disabled = true
      } else {
        this.infinityScrollOrther.disabled = false
      }

    }, (error) => {
      throw error
    })
  }
  loadMoreNews() {
    this.getDataNews()
  }
  loadMoreTranfer() {
    this.getDataTransfer()
  }
  loadMoreOrthers() {
    this.getDataOrther()
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
    // this.router.navigate(['/news/detail/' + id])

    this.router.navigate(['/news/detail'], {
      queryParams: {
        id: JSON.stringify(id)
      }
    })
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
