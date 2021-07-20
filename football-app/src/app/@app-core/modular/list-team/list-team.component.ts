import { LanguageConstants } from './../ng-p-language/common.language';
import { AlertController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CompetitionService } from '../../http';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss'],
})
export class ListTeamComponent implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  constructor(
    public competitionService: CompetitionService,
    private alertController: AlertController
  ) { }

  @Input() listInArea = [];
  @Input() listTeam = [];
  @Input() listPopular = [];
  @Input() listPlayer = [];
  @Input() listLeagueFromFavorite = []
  @Input() listLeagueInArea = [];
  @Input() listLeagueInternational = [];
  @Input() indexSlide;
  @Input() type;
  @Input() team;
  @Input() search;
  headers = new HttpHeaders();
  headersParam
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
  listFavoriteLeague
 
  ngOnInit() {
  }
  toggleSubcriseTournaments(item) {
    localStorage.setItem('league_id', item.league_id)
    this.paramSub.subscribe_source.sourceable_id = item.league_id
    this.paramSub.subscribe_source.sourceable_type = "Competition"
    this.paramUnSub.sourceable_id = item.league_id
    this.paramUnSub.sourceable_type = "Competition"
    if (item.check == false) {
      item.check = true;
      item.img = '../../../../assets/img/star_orange.svg'
      this.competitionService.subscribe(this.paramSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }
    else {
      this.presentAlertConfirm(() => {
        item.check = false;
        item.img = '../../../../assets/img/star.svg'
        this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
        },
          (error) => {
            throw error
          })
      });
    }
  }
  toggleSubcriseLeague(item) {
    localStorage.setItem('league_id', item.league_id)
    this.paramSub.subscribe_source.sourceable_id = item.league_id
    this.paramSub.subscribe_source.sourceable_type = "Competition"
    this.paramUnSub.sourceable_id = item.league_id
    this.paramUnSub.sourceable_type = "Competition"
    if (item.check == false) {
      this.competitionService.subscribe(this.paramSub).subscribe(data => {
  
        item.check = true;
        item.img = '../../../../assets/img/star_orange.svg'
      },
        (error) => {
          throw error
        })
    }
    else {
      this.presentAlertConfirm(() => {
        item.check = false;
        item.img = '../../../../assets/img/star.svg'
        this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
        },
          (error) => {
            throw error
          })
      });
    }
  }
  toggleSubcriseTeam(item) {
    localStorage.setItem('team_key', item.team_key)
    this.paramSub.subscribe_source.sourceable_id = item.team_key
    this.paramSub.subscribe_source.sourceable_type = "Team"
    this.paramUnSub.sourceable_id = item.team_key
    this.paramUnSub.sourceable_type = "Team"
    if (item.check == false) {
      item.check = true;
      item.img = '../../../../assets/img/star_orange.svg'
      this.competitionService.subscribe(this.paramSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }
    else {
      this.presentAlertConfirm(() => {
        item.check = false;
        item.img = '../../../../assets/img/star.svg'
        this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
        },
          (error) => {
            throw error
          })
      });
    }
  }
  toggleSubcrisePlayer(item) {
    this.paramSub.subscribe_source.sourceable_id = item.player_key
    this.paramSub.subscribe_source.sourceable_type = "Player"
    this.paramUnSub.sourceable_id = item.player_key
    this.paramUnSub.sourceable_type = "Player"
    if (item.check == false) {
      item.check = true;
      item.img = '../../../../assets/img/star_orange.svg'
      this.competitionService.subscribe(this.paramSub).subscribe(() => {
      },
        (error) => {
          throw error
        })
    }
    else {
      this.presentAlertConfirm(() => {
        item.check = false;
        item.img = '../../../../assets/img/star.svg'
        this.competitionService.unsubscribe(this.paramUnSub).subscribe(() => {
        },
          (error) => {
            throw error
          })
      });
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
            func();
          }
        }
      ]
    });
    await alert.present();
  }


}
