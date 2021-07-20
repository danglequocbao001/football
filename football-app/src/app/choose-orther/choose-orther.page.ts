import { LanguageConstants } from '../@app-core/modular/ng-p-language/common.language';
import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { SendDataService } from '../@app-core/utils/sendData.service';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-choose-orther',
  templateUrl: './choose-orther.page.html',
  styleUrls: ['./choose-orther.page.scss'],
})
export class ChooseOrtherPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  @Output() myEvent = new EventEmitter();
  league = {
    inArea: [],
    international: [],
  }
  leagueFromFavorite = {
    inArea: [],
    international: [],
  }
  data: any;
  team = []
  players = []
  type
  headers = new HttpHeaders();
  headersParam: any
  private backButton: any
  info: any
  arrLength
  search
  from
  device
  constructor(
    private sendDataService: SendDataService,
    private favoriteService: FavoriteService,
    private loadingService: LoadingService,
    private router: Router,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.sendDataService.receiveData.subscribe((data: any) => {
      this.league.inArea = data?.area
      this.league.international = data?.popular;
      this.team = data?.team
      this.type = data?.type
      this.info = data?.info
      this.from = data?.from
    })
  }
  ionViewDidLeave() {
   this.search = ''
  }
  ionViewWillEnter() {
    this.league = {
      inArea: [],
      international: [],
    }
    this.leagueFromFavorite = {
      inArea: [],
      international: [],
    }
  
    if (this.info == 'TeamSuggetion') {
      this.getDataSuggestionTeam()
    } else if (this.info == 'LeagueSuggetion') {
      this.getDataSuggestionLeague()
    }
    else {
      this.getDataPlayer()
    }
   
    if (localStorage.getItem('device') == 'true') {
      this.device = true
    } else {
      this.device = false
    }
  }
  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribe(() => {
    })
  }
  ionViewWillLeave() {
    this.backButton.unsubscribe()

  }
  getDataSuggestionTeam() {
    this.loadingService.present()
    this.favoriteService.suggestionTeam().subscribe(data => {
      this.loadingService.dismiss()
      this.arrLength = 0;
      this.team = data
      this.arrLength = this.team.length;
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
    this.loadingService.present()
    this.favoriteService.suggestionLeague().subscribe((data: any) => {
      this.league.inArea = data.in_area
      this.loadingService.dismiss()
      this.league.international = data.popular;
      this.league.inArea.forEach(i => {
        i.check = i.subscribe
        if (i.subscribe == true) {
          i.img = '../../../../assets/img/star_orange.svg'
        } else {
          i.img = '../../../../assets/img/star.svg'
        }
      })
      this.league.international.forEach(i => {
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
    this.loadingService.present()
    this.favoriteService.suggestionPlayer().subscribe((data: any) => {
      this.loadingService.dismiss()
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

  goBack() {
    if(this.from == 'search') {
    this.router.navigateByUrl("/search")

    } else if (this.from == 'favorite') {
      this.router.navigateByUrl("/favorite")
      
    } else {
      this.router.navigateByUrl("/tournaments")
    }
  }
}
