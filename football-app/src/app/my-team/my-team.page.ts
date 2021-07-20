import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { IonSlides, Platform } from '@ionic/angular'
import { BannerService } from '../@app-core/http'
import { myTeamService } from '../@app-core/http/my-team'
import { LoadingService } from '../@app-core/utils'
import { DAY } from '../@app-core/http/@http-config';
import { NgPLanguageService } from '../@app-core/modular/ng-p-language/ng-p-language.service';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.page.html',
  styleUrls: ['./my-team.page.scss'],
})
export class MyTeamPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  handleServiceLanguage: any;
  selectedLanguage = ''
  @ViewChild('mySlide') slides: IonSlides;
  constructor(
    private myteamService: myTeamService,
    private platform: Platform,
    private router: Router,
    private loadingService: LoadingService,
    private banner: BannerService,
    private ngPLanguageService: NgPLanguageService,

  ) {
    this.handleServiceLanguage = this.ngPLanguageService.getLanguage.subscribe((data) => {
      this.dataLanguage = data;

      this.selectedLanguage = this.ngPLanguageService.getSelectedLanguage();

    })
  }

  tagNew = 2

  listTeam = []
  listAll = []
  checkDataToday = false
  checkDataTomorrow = false
  toggleValue = false
  checkLanguage = false
  today
  tomorrow
  date
  dateNext
  month
  month_later
  year_later
  year
  from_date
  to_date
  indexSlide
  csvData: any[] = [];
  headerRow: any[] = [];
  data: any;
  slideOpts = {
    centeredSlides: true,
    loop: true,
    autoplay: true,
    setInitialSlide: 2,
  };
  listContain: []
  listday = DAY
  valueTab = "all"
  private backButton: any
  bannerData = []
  my = [
    {
      listToday: [],
      listLive: [],
      listLiveHandle: [],
      listGroupDate: [],
      listGroupLeague: [],
      listFinal: [],
      countToday: 0,
    },
    {
      listTomorrow: [],
      countTomorrow: 0,
      listFinal: [],
    },
    {
      listMonth: [],
      listFinal: [],
      countMonth: 0,

    }
  ]
  all = [
    {
      listToday: [],
      listLive: [],
      listFinal: [],
      listLiveHandle: [],
      countToday: 0,
    },
    {
      listTomorrow: [],
      countTomorrow: 0,
      listFinal: [],
    },
    {
      listMonth: [],
      listFinal: [],
      countMonth: 0
    }
  ]
  listNew = []
  param = {
    device_key: localStorage.getItem('device-key'),
    from_date: '',
    to_date: ''
  }
  paramget
  search
  checkTabMyData = false
  checkTabAllData = false
  ngOnInit() {

  }
  ionViewWillEnter() {
    this.my = [
      {
        listToday: [],
        listLive: [],
        listLiveHandle: [],
        listGroupDate: [],
        listGroupLeague: [],
        listFinal: [],
        countToday: 0,
      },
      {
        listTomorrow: [],
        countTomorrow: 0,
        listFinal: [],
      },
      {
        listMonth: [],
        listFinal: [],
        countMonth: 0,

      }
    ]
    this.all = [
      {
        listToday: [],
        listLive: [],
        listFinal: [],
        listLiveHandle: [],
        countToday: 0,
      },
      {
        listTomorrow: [],
        countTomorrow: 0,
        listFinal: [],
      },
      {
        listMonth: [],
        listFinal: [],
        countMonth: 0
      }
    ]
    this.checkTabMyData = true
    localStorage.setItem('home_redirect', 'true')
    const tabs = document.querySelectorAll('ion-tab-bar');
    Object.keys(tabs).map((key) => {
      tabs[key].style.display = 'flex';
    });
    if (localStorage.getItem('language') == 'Vietnamese') {
      this.checkLanguage = false
    } else {
      this.checkLanguage = true
    }
    this.getData()
    this.banner.getBanner().subscribe(data => {
      this.bannerData = data;
    });
  }
  openCalendar() {
    
  }
  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribe( () => {
    })
  }
  ionViewWillLeave() {
    this.backButton.unsubscribe()
  }

  handelDate(start, end) {
    var givendate = new Date()
    givendate.setDate(givendate.getUTCDate() + start)
    this.date = givendate.getUTCDate()
    this.date = this.date < 10 ? 0 + `${this.date}` : this.date

    var d = new Date()
    d.setDate(d.getUTCDate() + end)
    this.dateNext = d.getUTCDate()
    this.dateNext = this.dateNext < 10 ? 0 + `${this.dateNext}` : this.dateNext
    var m = new Date()
    this.month = (m.getUTCMonth() + 1)
    this.month = this.month < 10 ? 0 + `${this.month}` : this.month
    var y = new Date()
    this.year = y.getUTCFullYear()
    if (this.date > this.dateNext) {
      this.month_later = (parseInt(this.month) + 1)
      this.month_later = this.month_later < 10 ? 0 + `${this.month_later}` : this.month_later
    }
    else {
      this.month_later = this.month
    }
    if (this.month > this.month_later) {
      this.year_later = (parseInt(this.year) + 1)

    } else {
      this.year_later = this.year
    }
    return this.from_date = this.year + '-' + this.month + '-' + this.date +
      ' ' + this.year_later + '-' + this.month_later + '-' + this.dateNext
  }
  gotoSearch() {
    let data = {
      from: 'score'
    }
    this.router.navigate(['/search'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
  getData() {
    this.loadingService.present()
    const paramMonth = this.handelDate(0, 7).split(' ')
    this.param.from_date = paramMonth[0],
      this.param.to_date = paramMonth[1]
    this.myteamService.getAllMyTeam(this.param).subscribe((data: any) => {
      this.loadingService.dismiss()
      this.my[2].listMonth = data.mine
      this.all[2].listMonth = data.all
      this.Sort(this.all[2].listMonth)
      this.Sort(this.my[2].listMonth)
      this.getMonth()
    }, (error) => {
      throw error
    })
    this.paramget = this.handelDate(0, 1).split(' ')
    this.param.from_date = this.paramget[0],
      this.param.to_date = this.paramget[1]

    this.myteamService.getAllMyTeam(this.param).subscribe(
      data => {
        this.listAll = data.all
        this.listTeam = data.mine
        this.Sort(this.listAll)
        this.Sort(this.listTeam)
        this.getDataMy()
        this.getDataAll()

      }, (error) => {
        throw error
      })
    this.getLive()

  }
  Sort(list) {
    list.sort(function (a, b) {
      var a_time = new Date(a.match_date)
      var b_time = new Date(b.match_date)
      return a_time.getTime() - b_time.getTime()
    })
  }
  getLive() {
    this.myteamService.getListMatchLive(this.param).subscribe(data => {
      this.my[0].listLive = data?.mine
      this.all[0].listLive = data?.all
      this.handle(this.my[0].listLive, "match_date", "league_name", this.my[0].listLiveHandle)
      this.handle(this.all[0].listLive, "match_date", "league_name", this.all[0].listLiveHandle)
    }, (error) => {
      throw error
    })
  }
  getMonth() {
    this.handle(this.my[2].listMonth, "match_date", "league_name", this.my[2].listFinal)
    if (this.my[2].listFinal.length == 0) {
      this.checkTabMyData = true
    } else this.checkTabMyData = false;
    this.handle(this.all[2].listMonth, "match_date", "league_name", this.all[2].listFinal)
    if (this.all[2].listFinal.length != 0) {
      this.checkTabAllData = true
    } else this.checkTabMyData = false;

  }
  getDataMy() {
    this.my[0].listToday = this.listTeam.filter(i => {
      return i.match_date == this.paramget[0]
    })
    this.my[0].countToday = this.my[0].listToday.length
    this.my[1].listTomorrow = this.listTeam.filter(i => {
      return i.match_date == this.paramget[1]
    })
    this.my[1].countTomorrow = this.my[1].listTomorrow.length
    this.handle(this.my[0].listToday, "match_date", "league_name", this.my[0].listFinal)
    if (this.my[0].listFinal.length == 0) {
      this.checkTabMyData = true
    }

    this.handle(this.my[1].listTomorrow, "match_date", "league_name", this.my[1].listFinal)
    if (this.my[1].listFinal.length == 0) {
      this.checkTabMyData = true
    }
  }

  getDataAll() {
    this.all[0].listToday = this.listAll.filter(i => {
      return i.match_date == this.paramget[0]
    })
    this.all[0].countToday = this.all[0].listToday.length
    this.all[1].listTomorrow = this.listAll.filter(i => {
      return i.match_date == this.paramget[1]
    })
    this.all[1].countTomorrow = this.all[1].listTomorrow.length
    this.handle(this.all[0].listToday, "match_date", "league_name", this.all[0].listFinal)
    if (this.all[0].listFinal.length != 0) {
      this.checkTabAllData = true
    }

    this.handle(this.all[1].listTomorrow, "match_date", "league_name", this.all[1].listFinal)
    if (this.all[1].listFinal.length != 0) {
      this.checkTabAllData = true
    }
  }
  handle(list, param1, param2, final) {
    let handel = list.map(item => item[param1])
    let listContain = []
    handel = [...new Set(handel)]
    handel.forEach(i => {
      const result = list.filter(item => {
        return item[param1] === i
      })
      listContain.push(result)
    })
    this.handleItem(listContain, param2, final)

  }
  handleItem(list, param2, final) {
    let listGroupByDate = []
    let handel2 = list.forEach(listItem => {
      let handelItem = listItem.map(item => item[param2])
      handelItem = [...new Set(handelItem)]
      let listContainItem = []
      handelItem.forEach(item => {
        const result = listItem.filter(m => {
          let dt = new Date(m.match_date)
          let day = dt.getDay()
          this.listday.find((i) => {
            if (day == i.day) {
              if (localStorage.getItem('language') == 'Vietnamese') {
                m['day'] = i.textVie
              } else {
                m['day'] = i.textEng
              }
            }
          })
          return m[param2] === item
        })
        listContainItem.push(result)
      });
      listGroupByDate.push({ count: listItem.length, content: listContainItem })
    })
    final.push(listGroupByDate)
  }

  segmentChanged(event: any) {
    this.valueTab = event.detail.value
  }
  changeValue(event) {
    this.toggleValue = event.detail.checked
    if (this.toggleValue) {
      if (this.valueTab == 'all') {
        this.tagNew = 4
      } else {
        this.tagNew = 3
      }
    } else {
      if (this.valueTab == 'all') {
        this.tagNew = 2
      } else {
        this.tagNew = 1
      }
    }
  }
  changeTabsMyTeam() {
    this.valueTab = 'my-team'
    if (this.toggleValue) {
      this.tagNew = 3
    } else {
      this.tagNew = 1
    }
  }
  changeTabsAll() {
    this.valueTab = 'all'
    if (this.toggleValue) {
      this.tagNew = 4
    } else {
      this.tagNew = 2
    }
  }
  changeTabs() {
    if (this.toggleValue) {
      if (this.tagNew == 3) {
        this.tagNew = 4
      } else if (this.tagNew == 4) {
        this.tagNew = 3
      }
    } else {
      if (this.tagNew == 1) {
        this.tagNew = 2
      } else if (this.tagNew == 2) {
        this.tagNew = 1
      }
    }
  }
  ngOnDestroy() {
    this.handleServiceLanguage.unsubscribe();
  }
}