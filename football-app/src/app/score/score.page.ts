import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService, NewsService } from '../@app-core/http';
import { LanguageConstants } from '../@app-core/modular/ng-p-language/common.language';
import { NgPLanguageService } from '../@app-core/modular/ng-p-language/ng-p-language.service';
import { LoadingService } from '../@app-core/utils';
import { AlertController, IonSlides, Platform } from '@ionic/angular'
import { ScoreService } from '../@app-core/http/score';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  handleServiceLanguage: any;
  selectedLanguage = ''
  @ViewChild('mySlide') slides: IonSlides;
  constructor(
    private platform: Platform,
    private router: Router,
    private loadingService: LoadingService,
    private banner: BannerService,
    private ngPLanguageService: NgPLanguageService,
    private scoreService: ScoreService,
    private alert: AlertController,
    private newService: NewsService,

  ) {
    this.handleServiceLanguage = this.ngPLanguageService.getLanguage.subscribe((data) => {
      this.dataLanguage = data;
      this.selectedLanguage = this.ngPLanguageService.getSelectedLanguage();
    })
  
  }

  tagNew = 2
  valueTab = "all"
  daysofMonth = []
  bannerData = []
  nameMonth
  nameYear
  year
  currentDate

  today = new Date().toString().slice(4, 15)
  currentMonth: any
  currentYear
  paramMonth
  show = false
  checkLanguage = false
  checkTabMyData = false
  checkTabAllData = false
  hasCalendar = false
  toggleValue = false
  cutDate
  indexActive = 2
  
  DATES = [
    {
      nameEng: 'Sun',
      nameVie: 'CN',
      mr: '0vw',
    },
    {
      nameEng: 'Mon',
      nameVie: 'T2',
      mr: '12vw',
    },
    {
      nameEng: 'Tue',
      nameVie: 'T3',
      mr: '24vw'
    },
    {
      nameEng: 'Wed',
      nameVie: 'T4',
      mr: '36vw'
    },
    {
      nameEng: 'Thu',
      nameVie: 'T5',
      mr: '48vw'
    },
    {
      nameEng: 'Fri',
      nameVie: 'T6',
      mr: '60vw'
    },
    {
      nameEng: 'Sat',
      nameVie: 'T7',
      mr: '72vw'
    }]
  MONTHS = [
    {
      name: 'Jan',
      value: '01'
    },
    {
      name: 'Feb',
      value: '02'
    },
    {
      name: 'Mar',
      value: '03'
    },
    {
      name: 'Apr',
      value: '04'
    }
    , {
      name: 'May',
      value: '05'
    }
    , {
      name: 'Jun',
      value: '06'
    },
    {
      name: 'Jul',
      value: '07'
    },
    {
      name: 'Aug',
      value: '08'
    },
    {
      name: 'Sep',
      value: '09'
    },
    {
      name: 'Oct',
      value: '10'
    },
    {
      name: 'Nov',
      value: '11'
    },
    {
      name: 'Dec',
      value: '12'
    },
  ];
  priorityLeagueId = [
    '8634',
    '588',
    '589',
    '590',
    '148',
    '468',
    '195',
    '550',
    '262',
    '176',
    '569',
    '607',
    '8639',
    '8760',
    '8726',
    '8700',
    '184',
    '149',
    '469',
    '263',
    '196',
    '177'
  ];
  day
  param = {
    date: '',
    live: '',
  }
  date
  listFiveDay = []
  dayOrther
  listAll = []
  listFinalAll = []
  listMine = []
  listFinalMine = []
  listLiveAll = []
  listLiveFinalAll = []
  listLiveMine = []
  listLiveFinalMine = []
  toggleBtn = false
  slideOpts = {
    loop: true,
    autoplay: true,
    centeredSlides: true
  }
  device
  newActive = true
  private backButton: any

  footerList = []
  currentRouter: string;
  iconScore;
  iconNews;
  iconFav;
  iconSet;
  ngOnInit() {
    this.currentDate = new Date()
    this.currentMonth = this.currentDate.getMonth()
    this.currentYear = this.currentDate.getFullYear()
    this.day = this.currentDate.getDate()
    this.nameMonth = this.currentMonth + 1
    this.paramMonth = this.nameMonth
    this.year = this.currentYear
    this.paramMonth = (parseInt(this.paramMonth)) < 10 ? `0${this.paramMonth}` : this.paramMonth
    this.day = (parseInt(this.day)) < 10 ? `0${this.day}` : this.day
    this.handleDate()
    this.param.date = `${this.year}` + '-' + `${this.paramMonth}` + '-' + `${this.day}`
    
  }

  ionViewWillEnter() {
    this.reset();
    this.checkTabMyData = true
    localStorage.setItem('home_redirect', 'true')
    if (localStorage.getItem('language') == 'Vietnamese') {
      this.checkLanguage = false
    } else {
      this.checkLanguage = true
    }
    if (localStorage.getItem('device') == 'true') {
      this.getActiveNews()
      this.device = true
       this.checkBannerIos()
    } else {
      this.device = false
      this.getBanner()
    }
    this.getData()
  }

  checkBannerIos() {
    this.banner.checkBannerIos().subscribe(data => {
      if (data.active) {
        this.getBannerIos()
      }else {
        this.bannerData = [];
      }
    })
  }
  getBanner() {
    this.banner.getBanner().subscribe(data => {
        this.bannerData = data;
    });
  }
  getBannerIos() {
    this.banner.getBannerIos().subscribe( data =>{
      this.bannerData = data
    })
  }
  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribe(() => {
    })
  }
  ionViewWillLeave() {
    this.backButton.unsubscribe()
  }
  reset() {
    this.listAll = []
    this.listFinalAll = []
    this.listMine = []
    this.listFinalMine = []
    this.listLiveAll = []
    this.listLiveFinalAll = []
    this.listLiveMine = []
    this.listLiveFinalMine = []
  }
 
  ionViewDidLeave() {
    this.hasCalendar = false
  }
  getData() {
    this.reset()
    this.getDataAll()
    this.getDataMine()
  }
  getDataMine() {
    this.param.live = ''
    this.scoreService.getMine(this.param).subscribe(data => {
      this.handleDuplicateLeagueName(data);
      this.listMine = data
      this.handleStatusMatch(this.listMine)
      this.listFinalMine = this.handleGroupNameLeague(this.listMine, "league_id")
    })
  }
  getDataAll() {
    this.param.live = ''
    this.loadingService.present()
    this.scoreService.getAll(this.param).subscribe(data => {
      this.handleDuplicateLeagueName(data);
      this.loadingService.dismiss()
      this.listAll = data
      this.handleStatusMatch(this.listAll)
      this.listFinalAll = this.handleGroupNameLeague(this.listAll, "league_id")
    })
  }
  getDataLiveAll() {
    this.loadingService.present();
    this.param.live = '1'
    this.scoreService.getAll(this.param).subscribe(data => {
      this.handleDuplicateLeagueName(data);
      this.loadingService.dismiss();
      this.listLiveAll = data
      this.loadingService.dismiss();
      this.handleStatusMatch(this.listLiveAll)
      this.listLiveFinalAll = this.handleGroupNameLeague(this.listLiveAll, "league_id")
    })
  }
  getDataLiveMine() {
    this.loadingService.present();
    this.param.live = '1'
    this.scoreService.getMine(this.param).subscribe(data => {
      this.handleDuplicateLeagueName(data);
      this.loadingService.dismiss();
      this.listLiveMine = data
      this.loadingService.dismiss()
      this.handleStatusMatch(this.listLiveMine)
      this.listLiveFinalMine = this.handleGroupNameLeague(this.listLiveMine, "league_id")
    })
  }
  handleDuplicateLeagueName(data) {
    for (let match of data) {
      if (match.match_status == 'Cancelled') {
        match.match_hometeam_score = '-';
        match.match_awayteam_score = '-';
      }
      if (this.priorityLeagueId.indexOf(match.league_id) < 0) {
        match.league_name = match.country_name + ' - ' + match.league_name;
      }
    }
  }
  async presentAlert(data) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }
  handleGroupNameLeague(list, param) {
    let handle = list.map(item => item[param])
    let listContain = []
    handle = [...new Set(handle)]
    handle = this.handlePriority(handle)
    handle.forEach(i => {
      const result = list.filter(item => {
        return item[param] === i
      })
      listContain.push(result)
    })

    return listContain
  }
  handlePriority(handle) {
    let result = [];
    let mapping_array = handle.map(item => ({
      name: item,
      index: this.priorityLeagueId.indexOf(item) === -1 ? 999999 : this.priorityLeagueId.indexOf(item)
    }));
    mapping_array.sort(function (a, b) {
      if (a.index > b.index) return 1;
      if (a.index < b.index) return -1;
      return 0
    })
    for (let obj of mapping_array) {
      result.push(obj.name);
    }
    return result
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
  changeDate(item, i) {
    this.hasCalendar = false
    this.indexActive = i
    this.cutDate = item.date.split(' ')
    this.paramMonth = this.cutDate[1]
    this.MONTHS.forEach(i => {
      if (this.paramMonth == i.name) {
        this.paramMonth = i.value
      }
    })
    this.day = (parseInt(this.cutDate[2])) < 10 ? `0${this.cutDate[2]}` : this.cutDate[2]
    this.param.date = `${this.cutDate[3]}` + '-' + `${this.paramMonth}` + '-' + `${this.day}`
    this.getData()
  }
  openCalendar() {
    this.daysofMonth = []
    this.currentDate = new Date()
    this.currentMonth = this.currentDate.getMonth()
    this.currentYear = this.currentDate.getFullYear()
    this.day = this.currentDate.getDate()
    this.nameMonth = this.currentMonth + 1
    this.paramMonth = this.nameMonth
    this.year = this.currentYear
    this.getDaysInMonthUTC(this.currentMonth, this.year)
    this.paramMonth = (parseInt(this.paramMonth)) < 10 ? `0${this.paramMonth}` : this.paramMonth
    this.day = (parseInt(this.day)) < 10 ? `0${this.day}` : this.day
    this.param.date = `${this.year}` + '-' + `${this.paramMonth}` + '-' + `${this.day}`
    this.hasCalendar = !this.hasCalendar
  }
  closeCalendar() {
    this.hasCalendar = false
  }
  chooseDay(item) {
    this.hasCalendar = false
    this.indexActive = 5
    this.cutDate = item.today.split(' ')
    this.day = this.cutDate[1]
    this.paramMonth = this.cutDate[0]
    this.MONTHS.forEach(i => {
      if (this.paramMonth == i.name) {
        this.paramMonth = i.value
      }
    })
    this.param.date = `${this.cutDate[2]}` + '-' + `${this.paramMonth}` + '-' + `${this.day}`
    this.dayOrther = this.param.date
    if (localStorage.getItem('language') == 'Vietnamese') {
      this.dayOrther = this.dayOrther.split('-').reverse().join('-').slice(0, 5)

    } else {
      this.dayOrther = this.dayOrther.slice(5, 10)
    }
    this.getData()

  }
  handleDate() {
    for (let i = -2; i < 3; i++) {
      let givendate = new Date()
      givendate.setDate(givendate.getUTCDate() + i)
      this.date = givendate.toString()
      var handelDate = this.date.slice(0, 3)
      var dateVi
      switch (handelDate) {
        case 'Sun':
          dateVi = 'CN'
          break
        case 'Mon':
          dateVi = 'Thứ 2'
          break
        case 'Tue':
          dateVi = 'Thứ 3'
          break
        case 'Wed':
          dateVi = 'Thứ 4'
          break
        case 'Thu':
          dateVi = 'Thứ 5'
          break
        case 'Fri':
          dateVi = 'Thứ 6'
          break
        case 'Sat':
          dateVi = 'Thứ 7'
          break;
      }
      this.listFiveDay.push({ date: this.date, dateVi: dateVi })
    }
    return this.listFiveDay
  }
  changeTabsMyTeam() {
    this.valueTab = 'my-team'
    if (this.toggleValue) {
      this.tagNew = 3
    } else {
      this.tagNew = 1
    }
  }
  getDataLive() {
    this.reset()
    this.getDataLiveAll()
    this.getDataLiveMine()
  }
  changeValue(event) {

    this.toggleValue = event.detail.checked
    if (this.toggleValue) {
      this.loadingService.present()
      this.toggleBtn = true
      this.getDataLive()
      if (this.valueTab == 'all') {
        this.tagNew = 4
      } else {
        this.tagNew = 3
      }
    } else {
      this.getData()
      this.toggleBtn = false
      if (this.valueTab == 'all') {
        this.tagNew = 2
      } else {
        this.tagNew = 1
      }
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
  getDaysInMonthUTC(month, year) {
    var date = new Date(Date.UTC(year, month, 1))
    while (date.getUTCMonth() === month) {
      this.daysofMonth.push({
        day: new Date(date).toString().slice(8, 10),
        date: new Date(date).toString().slice(0, 3),
        today: new Date(date).toString().slice(4, 15)
      })
      date.setUTCDate(date.getUTCDate() + 1)
    }
    this.DATES.forEach(i => {
      if (this.daysofMonth[0].date == i.nameEng) {
        this.daysofMonth[0]['mr'] = i.mr
      }
    })
    return this.daysofMonth
  }
  prevMonth() {
    this.daysofMonth = []
    if (this.currentMonth == 0) {
      this.currentMonth = 11
      this.nameMonth = 12
      this.year = this.year - 1
    } else {
      this.nameMonth = this.nameMonth - 1

      this.currentMonth = this.currentMonth - 1
    }
    this.getDaysInMonthUTC(this.currentMonth, this.year)
  }
  nextMonth() {
    this.daysofMonth = []
    if (this.currentMonth == 11) {
      this.currentMonth = 0
      this.nameMonth = 1

      this.year = this.year + 1
    } else {

      this.nameMonth = this.nameMonth + 1

      this.currentMonth = this.currentMonth + 1
    }
    this.getDaysInMonthUTC(this.currentMonth, this.year)
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
    this.router.navigateByUrl('/'+`${item}`)
  }
}

