import { LanguageConstants } from './../@app-core/modular/ng-p-language/common.language';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, Platform } from '@ionic/angular';
import { myTeamService } from '../@app-core/http/my-team';
import { LoadingService } from '../@app-core/utils';
import { STATISTICS, STATUS_MATCH } from '../@app-core/http/@http-config/messages'
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  @ViewChild(IonContent, { static: true }) content: IonContent;
  tagNew = 'all';
  id
  match = []
  listGoalScorer45 = []
  listGoalScorer90 = []
  listCard45 = []
  listCard90 = []
  list = []
  listStatistics = []
  listHomeTeam: any
  listAwayTeam: any
  listRank = [];
  listSum = [];
  listHome = [];
  listAway = [];
  listCard = [];
  listScore = []
  twoFristRank = []
  listSubHome = []
  listSubAway = []
  checkSatusNotPlay = false
  goalAttemptsHome: any
  percentHomeFirst
  percentAwayFirst
  valueHomeFirst
  match_status
  listSub = []
  listNew = []
  checkLanguage = false
  listText = STATISTICS
  currentHomeTeamName
  img: any
  listMatch = STATUS_MATCH

  listVarible =
    {
      controllBallHome: 0,
      goalAttemptsHome: 0,
      cornerKicksHome: 0,
      shotsOnGoalHome: 0,
      shotsOffGoalHome: 0,
      blockedShotsHome: 0,
      offsidesHome: 0,
    }
  footerList = [
    {
      id: 0,
      active: true,
      title: this.dataLanguage.HIGHLIGHTS,
      img: '',
      imgSrc: 'assets/img/match/star.svg',
      imgActive: 'assets/img/match/star_active.svg'
    },
    {
      id: 1,
      active: false,
      img: '',
      imgSrc: 'assets/img/match/icon-team.svg',
      imgActive: 'assets/img/match/icon-team_active.svg',
      title: this.dataLanguage.TEAM
    },
    {
      id: 2,
      active: false,
      img: '',
      imgSrc: 'assets/img/match/analysis.svg',
      imgActive: 'assets/img/match/analysis_active.svg',
      title: this.dataLanguage.DEVELOPMENTS
    },
    {
      id: 3,
      active: false,
      img: '',
      imgSrc: 'assets/img/match/rank.svg',
      imgActive: 'assets/img/match/rank_active.svg',
      title: this.dataLanguage.RATINGS
    }
  ]
  device
  constructor(
    private myTeamService: myTeamService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private platform: Platform
  ) {


  }

  ngOnInit() {
    this.loadingService.present()
    this.init()
    this.getData()

  }
  ionViewWillEnter() {
    if (localStorage.getItem('language') == 'Vietnamese') {
      this.checkLanguage = false
    } else {
      this.checkLanguage = true
    }
    if (localStorage.getItem('device') == 'true') {
      this.device = true
    } else {
      this.device = false
    }
  }
  init() {
    this.footerList.forEach((e) => {
      if (e.id == 0) {
        e.img = e.imgActive
      }
      else {
        e.img = e.imgSrc
      }
    })

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
  getData() {

    let param = {
      match_id: localStorage.getItem('id-macth-detail')
    }
    this.myTeamService.getDetailMatch(param).subscribe((data: any) => {
      console.log(data)
      this.loadingService.dismiss()
      this.match = data
      this.handleStatusMatch(this.match)
      this.listStatistics = data[0].statistics
      this.listGoalScorer90 = this.listGoalScorer45 = this.listScore = data[0].goalscorer
      this.listCard90 = this.listCard45 = this.listCard = data[0].cards
      this.listHomeTeam = data[0].lineup.home
      this.listAwayTeam = data[0].lineup.away
      this.listSubAway = data[0]?.substitutions?.away
      this.listSubHome = data[0]?.substitutions?.home
      this.handlelistSub()
      this.handleDataScore()
      this.handleProgress()

    })
    let param_league = {
      league_id: localStorage.getItem('id-league-macth')
    }
    this.myTeamService.getRankTeam(param_league).subscribe(
      (data: any) => {
        if (data.error) {
          return
        }
        else {
          this.listRank = data
          this.listRank.forEach((i) => {
            i.GD = i.overall_league_GF - i.overall_league_GA
          })
          for (var sum in this.listRank) {
            this.listSum.push([sum, this.listRank[sum]]);
          }
          this.listSum.sort(function (a, b) {
            return a[1].overall_league_position - b[1].overall_league_position;
          });
          for (var home in this.listRank) {
            this.listHome.push([home, this.listRank[home]]);
          }
          this.listHome.sort(function (a, b) {
            return a[1].home_league_position - b[1].home_league_position;
          });
          // 
          for (var away in this.listRank) {
            this.listAway.push([away, this.listRank[away]]);
          }
          this.listAway.sort(function (a, b) {
            return a[1].away_league_position - b[1].away_league_position;
          });

        }
        for (let rank of data) {
          if (rank.team_name == localStorage.getItem('hometeam_name') || rank.team_name == localStorage.getItem('awayteam_name')) this.twoFristRank.push(rank)
        }
      },
    )

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
  changeTabs(value) {
    this.tagNew = value
  }
  checkMatchNotStatusWillPlay() {

  }
  slideChanged(slides) {
    slides.getActiveIndex().then(index => {
      this.footerList.forEach((e) => {
        if (e.id !== index) this.activeItem(e)
        else this.disableItem(e)
      })
    });
  }
  handlelistSub() {
    this.listSubAway.forEach((i) => {
      i.home = true
    })
    this.listSubHome.forEach((i) => {
      i.away = true
    })
    this.listSub = this.listSubHome.concat(this.listSubAway)
    this.listSub.forEach((i) => {
      i.time = parseInt(i.time)
      i.info = 'sub'
      i.home_fault = ''
      i.away_scorer = ''
      i.home_scorer = ''
      i.away_fault = ''
      i.imgSub = 'assets/img/match/sub.svg'
      i.substitution = i.substitution.split('|')
      i.time_ = i.time
    })
    this.listSub.forEach((i) => {
      if (i.time <= 45) {
        this.listGoalScorer45.push(i)
      }
      this.listGoalScorer90.push(i)
    })

  }
  handleDataScore() {
    this.listGoalScorer45 = this.listGoalScorer45.filter((i) => {
   
      return i.time <= 45
    })
    this.listCard45 = this.listCard45.filter((i) => {
      return i.time <= 45
    })
    this.listGoalScorer45.forEach((i) => {
      if (i.info == "Penalty") {
        i.imgScore = 'assets/img/match/penalty_score.svg'
      }
      else {
        i.imgScore = 'assets/img/match/goal.svg'
      }

      i.time = parseInt(i.time)
      i.home_fault = ''
      i.away_fault = ''
      i.score = true
    })
    this.listCard45.forEach((i) => {
      i.time = parseInt(i.time)
      i.away_scorer = ''
      i.home_scorer = ''
      if (i.card == 'yellow card') {
        i.imgCard = 'assets/img/match/yellow_card.svg'
      }
      else {
        i.imgCard = 'assets/img/match/red_card.svg'
      }
    })
    for (let i = 0; i < this.listCard45.length; i++) {
      this.listGoalScorer45.push(this.listCard45[i])
    }
    // list 90 
    this.listGoalScorer90 = this.listGoalScorer90.filter((i) => {
        if (typeof i.time === 'string') {
        const listNew = i.time.split('+')
        var tong = listNew.reduce((a, b) => {
          return parseInt(a) + parseInt(b)
        }, 0)
      }
         i.time = tong
      return i.time > 45
    })
    this.listCard90 = this.listCard90.filter((i) => {
      return i.time > 45
    })
    this.listGoalScorer90.forEach(i => {
      i.time = parseInt(i.time)
    })
    this.listCard90.forEach(i => {
      i.time = parseInt(i.time)
    })
    this.listGoalScorer90.forEach((i) => {
      if (i.info == "Penalty") {
        i.imgScore = 'assets/img/match/penalty_score.svg'
      }
      else {
        i.imgScore = 'assets/img/match/goal.svg'
      }
      i.time = parseInt(i.time)

      i.home_fault = ''
      i.away_fault = ''
      i.score = true
    })
    this.listCard90.forEach((i) => {
      i.away_scorer = ''
      i.home_scorer = ''
      i.time = parseInt(i.time)
      if (i.card == 'red card') {
        i.imgCard = 'assets/img/match/red_card.svg'
      }
      else if (i.card == 'yellow card') {
        i.imgCard = 'assets/img/match/yellow_card.svg'
      }
    })

    for (let i = 0; i < this.listCard90.length; i++) {
      this.listGoalScorer90.push(this.listCard90[i])
    }
    this.listGoalScorer90 = this.listGoalScorer90.sort((b, a) => {
      return a.time - b.time
    })
    this.listGoalScorer45 = this.listGoalScorer45.sort((b, a) => {
      return a.time - b.time
    })
    this.listCard.forEach((i) => {
      if (typeof i.time === 'string') {
        i.away_scorer = ''
        i.home_scorer = ''
        if (i.card == 'red card') {
          i.imgCard = 'assets/img/match/red_card.svg'
        }
        else if (i.card == 'yellow card') {
          i.imgCard = 'assets/img/match/yellow_card.svg'
        }
        const listNew = i.time.split('+')
        var tong = listNew.reduce((a, b) => {
          return parseInt(a) + parseInt(b)
        }, 0)
        if (tong < 90) this.listGoalScorer45.unshift(i)
        else this.listGoalScorer90.unshift(i)
      }
    })
    console.log(this.listScore,'score')
    this.listScore.forEach((i) => {
      if (typeof i.time === 'string') {
        i.home_fault = ''
        i.away_fault = ''
        i.score = true
        if (i.info == "Penalty") {
          i.imgScore = 'assets/img/match/penalty_score.svg'
        }
        else {
          i.imgScore = 'assets/img/match/goal.svg'

        }
        this.listNew = i.time.split('+')
        var tong = this.listNew.reduce((a, b) => {
          return parseInt(a) + parseInt(b)
        }, 0)
        if (tong < 90) this.listGoalScorer45.unshift(i)
        else this.listGoalScorer90.unshift(i)
       
      }
    })
  }

  change(slides, item) {
    switch (item.id) {
      case 0:
        slides.slideTo(0)
        this.footerList.forEach((e) => {
          if (e.id !== 0) this.activeItem(e)
          else this.disableItem(e)
        })
        break
      case 1:
        slides.slideTo(1)
        this.footerList.forEach((e) => {
          if (e.id !== 1) this.activeItem(e)
          else this.disableItem(e)
        })
        break
      case 2:
        slides.slideTo(2)
        this.footerList.forEach((e) => {
          if (e.id !== 2) this.activeItem(e)
          else this.disableItem(e)
        })
        break
      case 3:
        slides.slideTo(3)
        this.footerList.forEach((e) => {
          if (e.id !== 3) this.activeItem(e)
          else this.disableItem(e)
        })
        break
    }
  }
  activeItem(e: any) {
    e.active = false
    if (e.img === e.imgActive) {
      e.img = e.imgSrc
    }
  }
  disableItem(e: any) {
    e.img = e.imgActive
    e.active = true
  }
  goDetailProgress(slides) {
    slides.slideTo(2)
    this.footerList.forEach((e) => {
      if (e.id !== 2) this.activeItem(e)
      else this.disableItem(e)
    })
  }
  gotoRank(slides) {
    slides.slideTo(3)
    this.footerList.forEach((e) => {
      if (e.id !== 3) this.activeItem(e)
      else this.disableItem(e)
    })
  }
  handleProgress() {
    this.listStatistics.forEach((item) => {
      item.home = parseInt(item.home)
      item.away = parseInt(item.away)
      item.value = 0
      item.name = ''
    })
    this.percentHomeFirst = this.listStatistics[0]?.home
    this.percentAwayFirst = this.listStatistics[0]?.away
    this.valueHomeFirst = this.listStatistics[0]?.home / 100
    this.listStatistics.shift();
    this.listStatistics.forEach((item) => {
      item.value = item.home / (item.home + item.away)

      if (localStorage.getItem('language') == 'English') {
        this.listText.find((e) => {
          if (item.type == e.text) {
            item.type = e.text
          }
        })
      }
      else {
        this.listText.find((e) => {
          if (item.type == e.text) {
            item.type = e.valueString
          }
        })
      }
    })

  }

  goBack() {
    this.router.navigateByUrl('/score');
  }
  converNumber(value) {
    return parseInt(value);
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