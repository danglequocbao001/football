import { FavoriteService } from './../@app-core/http/favorite/favorite.service';
import { Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { IonSlides } from '@ionic/angular'
import { CompetitionService } from '../@app-core/http'
import { LoadingService } from '../@app-core/utils'
import { POSITION } from '../@app-core/http/@http-config/index'
import { SendDataService } from '../@app-core/utils/sendData.service'
import { LanguageConstants } from '../@app-core/modular/ng-p-language/common.language'
@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {
  @ViewChild('mySlide') slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    // allowTouchMove: false
  };
  headerCustom = { title: LanguageConstants.dataLanguage.SELECT_LEAGUE_BY_COUNTRY};
  id

  dataLanguage = LanguageConstants.dataLanguage;
  listInArea = []
  listPopular = []
  listTeam = []
  listPlayer = []
  indexSlide = 0
  firstS0 = false
  firstS1 = false
  firstS2 = false
  listPosition = POSITION
  check
  paramSub = {
    subscribe_source: {
      sourceable_id: '',
      sourceable_type: '',
      device_key: localStorage.getItem('device-key')
    }
  }
  paramUnSub = {
    sourceable_id: '',
    sourceable_type: '',
    device_key: localStorage.getItem('device-key')
  }
  device
  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private loadingService: LoadingService,
    private sendDataService: SendDataService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.loadingService.present()
    // this.route.queryParams.subscribe(params => {
    //   this.id = JSON.parse(params['data'])
    // })
    this.getDataCompetition();
    // this.slides.lockSwipeToNext(true);
    this.getDataPlayer();
  }
  ionViewWillEnter() {
    if (localStorage.getItem('device') == 'true') {
      this.device = true
    } else {
      this.device = false
    }
  }
  getDataCompetition() {
    let param = {
      country_id: localStorage.getItem('country_id'),
    }
    this.competitionService.getAllCompetitions(param).subscribe((data) => {
      this.firstS0 = true
      this.listInArea = data.in_area
      this.listInArea.forEach((e) => {
        e.check = false
        e.img = '../../../../assets/img/star.svg'
      })
      this.listPopular = data.popular
      this.listPopular.forEach((e) => {
        e.check = false
        e.img = '../../../../assets/img/star.svg'
      })
      this.loadingService.dismiss()
    })
  }
  getDataPlayer() {
    this.favoriteService.suggestionPlayer().subscribe((data: any) => {
      this.listPlayer = data.slice(0, 10)
      this.listPlayer.forEach(i => {
        i.check = i.subscribe
        if (i.subscribe == true) {
          i.img = '../../../../assets/img/star_orange.svg'
        } else {
          i.img = '../../../../assets/img/star.svg'
        }
      })
    },
    )
  }
  gotoLeagueOrther() {
    var data = {
      area: this.listInArea,
      popular: this.listPopular,
      type: 'League',
      from: 'Tournament'
    }
    this.router.navigateByUrl("/choose-orther");
    this.sendDataService.sendData(data)

  }
  gotoTeamOrther() {
    var data = {
      team: this.listTeam,
      type: 'Team',
      from: 'Tournament'
    }
    this.router.navigateByUrl("/choose-orther");
    this.sendDataService.sendData(data)
  }
  goPlayerOrther() {
    let param = {
      type: "Player",
      info: "PlayerSuggetion",
      from: 'Tournament'
    }
    this.router.navigateByUrl("/choose-orther");
    this.sendDataService.sendData(param)

  }

  toggleSubcrisePlayerEven(item) {
    this.paramSub.subscribe_source.sourceable_id = item.player_key
    this.paramSub.subscribe_source.sourceable_type = "Player"
    this.paramUnSub.sourceable_id = item.player_key
    this.paramUnSub.sourceable_type = "Player"
    if (item.check == false) {
      item.check = true
      item.img = '../../assets/img/star_orange.svg'
      this.competitionService.subscribe(this.paramSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }
    else {
      item.check = false
      item.img = '../../assets/img/star.svg'
      this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }

  }
  toggleSubcrisePlayerOdd(item) {
    this.paramSub.subscribe_source.sourceable_id = item.player_key
    this.paramSub.subscribe_source.sourceable_type = "Player"
    this.paramUnSub.sourceable_id = item.player_key
    this.paramUnSub.sourceable_type = "Player"
    if (item.check == false) {
      item.check = true
      item.img = '../../assets/img/star_orange.svg'
      this.competitionService.subscribe(this.paramSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }
    else {
      item.check = false
      item.img = '../../assets/img/star.svg'
      this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }

  }
  slideChanged() {
    this.slides.getActiveIndex().then(index => {
      if ((index == 1 && this.firstS1 == false) || (index == 0 && this.firstS0 == false)) {
        this.loadingService.present()
      }
      if (index == 1) {
        this.indexSlide = 1
        this.check = true
        this.headerCustom.title = LanguageConstants.dataLanguage.SELECT_FAVORITE_FOOTBALL_TEAM; 
        let paramGetAllTeam = {
          league_id: localStorage.getItem('league_id') || '10083'
        }
        this.competitionService.getAllTeams(paramGetAllTeam).subscribe((data: any) => {
          this.loadingService.dismiss()
          this.firstS1 = true
          this.listTeam = data
          this.listTeam.forEach((e) => {
            e.check = false
            e.img = '../../../../assets/img/star.svg'
            delete e.coaches
          })
        })

      }
      else if (index == 2) {
        this.indexSlide = 2
        this.headerCustom.title = LanguageConstants.dataLanguage.FAVORITE_PLAYER
        this.listTeam.forEach((item) => {
          if (item.team_key == localStorage.getItem('team_key')) {
            // this.listPlayer = item.players
            // this.listPlayer.forEach((e) => {
            //   e.check = false
            //   e.img = '../../../../assets/img/star.svg'
            //   // e.position = ''
            // })
            // this.listPlayer.forEach((p) => {
            //   p.position = this.listPosition.find((e) => {
            //     if (p.player_type == e.text) return e
            //   })
            // })
          }

        })

      }
      else if (index == 0) {
        this.indexSlide = 0
      }
    })
  }

  nextSlide() {
    if (this.indexSlide != 2) {
      this.slides.slideNext()
    } else {
      this.router.navigateByUrl('/score')
    }
  }
  Skip() {
    this.router.navigateByUrl('/score')
  }
}
