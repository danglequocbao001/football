import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { callCordovaPlugin } from '@ionic-native/core/decorators/common';
import { POSITION } from '../@app-core/http/@http-config';
import { myTeamService } from '../@app-core/http/my-team';
import { LoadingService } from '../@app-core/utils';
@Component({
  selector: 'app-player-info',
  templateUrl: './player-info.page.html',
  styleUrls: ['./player-info.page.scss'],
})
export class PlayerInfoPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  isProfile: boolean
  data
  info: any
  position = POSITION
  
  constructor(
    private myTeamService: myTeamService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.isProfile = true;
  }

  ngOnInit() {
    this.loadingService.present()
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params['data'])

    })
    this.getData()
  }
  segmentChanged(event: any) {
    this.isProfile = !this.isProfile;
  }
  getData() {
    var param = {
      player_id: this.data
    }
    this.myTeamService.getInfoPlayer(param).subscribe((data) => {
      this.loadingService.dismiss()
      this.info = data[0]
      // this.info.player_type = this.position.find((i)=>{
      //     if(this.info.player_type == i.text) return i
      // })
    }, (error)=>{
      throw error
    })
  }
}
