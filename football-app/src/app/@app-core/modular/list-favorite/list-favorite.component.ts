import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FavoriteService } from '../../http';
import { LoadingService } from '../../utils';

@Component({
  selector: 'app-list-favorite',
  templateUrl: './list-favorite.component.html',
  styleUrls: ['./list-favorite.component.scss'],
})
export class ListFavoriteComponent implements OnInit {
  @Input() listTeam = []
  @Input() listLeague = []
  headers = new HttpHeaders();
  headersParam
  @Input() titleTeam
  @Input() titleLeague
  checkAllTeam = false
  checkAllLeague = false
  imgTeamActive = 'assets/img/bell.svg'
  imgLeagueActive = 'assets/img/bell.svg'
  imgLeagueSrc = 'assets/img/belloff.svg'
  imgTeamSrc = 'assets/img/belloff.svg'
  imgTeam = ''
  imgLeague = ''
  img = ''
  request = {
    subscribe_source: {
      sourceable_type: '',
      sourceable_id: '',
      notification: false
    }
  }
  constructor(
    private favoriteService: FavoriteService,
    private loadingService: LoadingService
  ) {
  }
  ngOnInit() {
    // this.getDataTeam()
    // this.getDataLeague()
  }


  checkListTeam(): Boolean {
    return this.listTeam.every(item => {
      return item.notification == true;
    });
  }
  checkListLeague(): Boolean {
    return this.listLeague.every(item => {
      return item.notification == true;
    });
  }
  myChangeTeam(item) {
    this.request.subscribe_source.sourceable_type = "Team"
    this.request.subscribe_source.sourceable_id = item.team_key
    if (item.notification) {
      this.request.subscribe_source.notification = false
    } else {
      this.request.subscribe_source.notification = true
    }
    this.favoriteService.noti(this.request, this.headersParam).subscribe((data: any) => {
    },
    (error)=>{
      throw error
    })
  }
  myChangeLeague(item) {
    this.request.subscribe_source.sourceable_type = "Competition"
    this.request.subscribe_source.sourceable_id = item.league_id
    if (item.notification) {
      this.request.subscribe_source.notification = false
    } else {
      this.request.subscribe_source.notification = true
    }
    this.favoriteService.noti(this.request, this.headersParam).subscribe((data: any) => {
    },
    (error)=>{
      throw error
    })
  }
  toggleAllTeamClick() {
    if (this.checkListTeam()) {
      this.request.subscribe_source.notification = false
    }
    else {
      this.request.subscribe_source.notification = true
    }
    this.request.subscribe_source.sourceable_type = "Team"
    this.favoriteService.notiAll(this.request, this.headersParam).subscribe((data) => {
    },
    (error)=>{
      throw error
    })
  }
  toggleAllLeagueClick() {
    if (this.checkListLeague()) {
      this.request.subscribe_source.notification = false
    }
    else {
      this.request.subscribe_source.notification = true
    }
    this.request.subscribe_source.sourceable_type = "Competition"
    this.favoriteService.notiAll(this.request, this.headersParam).subscribe((data) => {
    },(error)=>{
      throw error
    })
  }
 

}
