import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { CompetitionService, FavoriteService } from '../@app-core/http'
import { LanguageConstants } from '../@app-core/modular/ng-p-language/common.language'
import { LoadingService } from '../@app-core/utils'
import { SendDataService } from '../@app-core/utils/sendData.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage
  league = []
  result = []
  team = []
  search = ''
  players = []
  check = true
  paramSub = {
    subscribe_source: {
      sourceable_id: null,
      sourceable_type: null,
      device_key: localStorage.getItem('device-key')
    }
  }
  paramUnSub = {
    sourceable_id: null,
    sourceable_type: null,
    device_key: localStorage.getItem('device-key')
  }
  paramSearch = {
    q: '',
    page: 1,
    per_page: 20
  }
  from
  device
  constructor(
    public competitionService: CompetitionService,
    private alertController: AlertController,
    private sendDataService: SendDataService,
    private favoriteService: FavoriteService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.reset()
    this.loadingService.present()
    this.getData()
    // this.route.queryParams.subscribe(param => {
    //     this.from = JSON.parse(param['data'])
   
    // })
  }
  getData() {
    this.getDataSuggestionLeague()
    this.getDataPlayer()
    this.getDataSuggestionTeam()

  }
  ionViewWillEnter() {
    if(localStorage.getItem('device') == 'true') {
      this.device = true
    }else {
      this.device = false
    }
  }
  ionViewWillLeave() {
    this.check = true
    this.getData()
    this.reset()
  
  }
  reset() {
    this.search = ''
  }
  goBack() {
    // if (this.from == 'score') {
      
    //   this.router.navigateByUrl('/score')
    // } else if (this.from == 'favorite') {
    //   this.router.navigateByUrl('/favorite')
    // }
  }
  searchInput(event) {
    if (this.search == '') {
      this.check = true
      return
    }
    else if (event.detail.value.length > 3) {
      setTimeout(i => {
        this.paramSearch.q = this.search
        this.getDataSearch()
      }, 1300)
    }
  }
  getDataSearch() {
    this.competitionService.search(this.paramSearch).subscribe(data => {
      this.result = data.data
      this.check = false
      this.result.forEach(i => {
        i.check = i.subscribe
        if (i.logo == '') {
          i.logo = 'assets/img/football-player.png'
        }
        if (i.subscribe == true) {
          i.img = '../../../../assets/img/star_orange.svg'
        } else {
          i.img = '../../../../assets/img/star.svg'
        }
      })
    },
      (error) => {
        throw error
      })
  }
  getDataSuggestionTeam() {
    this.favoriteService.suggestionTeam().subscribe(data => {
      this.loadingService.dismiss()
      this.team = data
      this.team.forEach(i => {
        i.check = i.subscribe
        if (i.subscribe == true) {
          i.img = '../../../../assets/img/star_orange.svg'
        } else {
          i.img = '../../../../assets/img/star.svg'
        }
      })
    }),
      (error) => {
        throw error
      }
  }
  getDataSuggestionLeague() {
    this.favoriteService.suggestionLeague().subscribe((data: any) => {
      this.league = data.in_area
      this.league = this.league.concat(data.popular)
      this.league.forEach(i => {
        i.check = i.subscribe
        if (i.subscribe == true) {
          i.img = '../../../../assets/img/star_orange.svg'
        } else {
          i.img = '../../../../assets/img/star.svg'
        }
      })
    },
      (error) => {
        throw error
      })
  }
  getDataPlayer() {
    this.favoriteService.suggestionPlayer().subscribe((data: any) => {
      this.players = data
      this.players.forEach(i => {
        i.check = i.subscribe
        if (i.subscribe == true) {
          i.img = '../../../../assets/img/star_orange.svg'
        } else {
          i.img = '../../../../assets/img/star.svg'
        }
      })
    },
    ),
      (error) => {
        throw error
      }
  }
  toggleSubcriseLeague(item) {
    this.paramSub.subscribe_source.sourceable_id = item.league_id
    this.paramSub.subscribe_source.sourceable_type = "Competition"
    this.paramUnSub.sourceable_id = item.league_id
    this.paramUnSub.sourceable_type = "Competition"
    if (item.check == false) {
      this.competitionService.subscribe(this.paramSub).subscribe(data => {
        item.check = true
        item.img = '../../../../assets/img/star_orange.svg'
      },
        (error) => {
          throw error
        })
    }
    else {
      this.presentAlertConfirm(() => {
        item.check = false
        item.img = '../../../../assets/img/star.svg'
        this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
        },
          (error) => {
            throw error
          })
      })
    }
  }
  // goMyTeam() {
  //   this.router.navigateByUrl('/my-team')
  // }
  toggleSubcriseTeam(item) {
    this.paramSub.subscribe_source.sourceable_id = item.team_key
    this.paramSub.subscribe_source.sourceable_type = "Team"
    this.paramUnSub.sourceable_id = item.team_key
    this.paramUnSub.sourceable_type = "Team"
    if (item.check == false) {
      item.check = true
      item.img = '../../../../assets/img/star_orange.svg'
      this.competitionService.subscribe(this.paramSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }
    else {
      this.presentAlertConfirm(() => {
        item.check = false
        item.img = '../../../../assets/img/star.svg'
        this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
        },
          (error) => {
            throw error
          })
      })
    }
  }
  toggleSubcrisePlayer(item) {
    this.paramSub.subscribe_source.sourceable_id = item.player_key
    this.paramSub.subscribe_source.sourceable_type = "Player"
    this.paramUnSub.sourceable_id = item.player_key
    this.paramUnSub.sourceable_type = "Player"
    if (item.check == false) {
      item.check = true
      item.img = '../../../../assets/img/star_orange.svg'
      this.competitionService.subscribe(this.paramSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }
    else {
      this.presentAlertConfirm(() => {
        item.check = false
        item.img = '../../../../assets/img/star.svg'
        this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
        },
          (error) => {
            throw error
          })
      })
    }
  }
  toggleSubcriseSearch(item) {
    this.paramSub.subscribe_source.sourceable_id = item.id
    this.paramUnSub.sourceable_id = item.id
    if (item.type == 'Team') {
      this.paramSub.subscribe_source.sourceable_type = "Team"
      this.paramUnSub.sourceable_type = "Team"
    } else if (item.type == 'Player') {
      this.paramSub.subscribe_source.sourceable_type = "Player"
      this.paramUnSub.sourceable_type = "Player"

    } else {
      this.paramSub.subscribe_source.sourceable_type = "Competition"
      this.paramUnSub.sourceable_type = "Competition"
    }
    if (item.check == false) {
      item.check = true
      item.img = '../../../../assets/img/star_orange.svg'
      this.competitionService.subscribe(this.paramSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }
    else {
      this.presentAlertConfirm(() => {
        item.check = false
        item.img = '../../../../assets/img/star.svg'
        this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
        },
          (error) => {
            throw error
          })
      })
    }
  }

  async presentAlertConfirm(func: Function) {
    const alert = await this.alertController.create({
      message: this.dataLanguage.WANNA_CANCEL,
      mode: 'ios',
      buttons: [
        {
          text: this.dataLanguage.NO,
        },
        {
          text: this.dataLanguage.YES,
          handler: () => {
            func()
          }
        }
      ]
    })
    await alert.present()
  }
  goTeamOrther() {
    let param = {
      type: "Team",
      info: "TeamSuggetion",
      from: "search"
    }
    this.router.navigateByUrl('/choose-orther')
    this.sendDataService.sendData(param)
  }
  goLeagueOrther() {
    let param = {
      type: "League",
      info: "LeagueSuggetion",
      from: "search"
    }
    this.router.navigateByUrl("/choose-orther")
    this.sendDataService.sendData(param)
  }
  goPlayerOrther() {
    let param = {
      type: "Player",
      info: "PlayerSuggetion",
      from: "search"
    }
    this.router.navigateByUrl("/choose-orther")
    this.sendDataService.sendData(param)

  }
}
