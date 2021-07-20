import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MiniGameService } from 'src/app/@app-core/http';
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';
import { LoadingService, ToastService } from 'src/app/@app-core/utils';

@Component({
  selector: 'app-mini-game',
  templateUrl: './mini-game.page.html',
  styleUrls: ['./mini-game.page.scss'],
})
export class MiniGamePage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  id;
  dataMiniGame: any;
  active_ios
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private miniGameService: MiniGameService,
    private loadingService: LoadingService
  ) {

  }
  headerCustom = { title: '' };

  ngOnInit() {
    if (localStorage.getItem('device') == 'true' ) {
      this.headerCustom.title = 'MiNi game'
      this.getItemIos()
   
    } else {
      this.getData()
    }
  }

  getData() {
    this.loadingService.present();
    this.miniGameService.getAll().subscribe((data: any) => {
      this.loadingService.dismiss();
      this.dataMiniGame = data;
      this.headerCustom.title = this.dataMiniGame.title
    },
      (error) => {
        throw error
      });
  }
  getItemIos() {
    this.loadingService.present();
    this.miniGameService.getAllIos().subscribe(data => {
      this.dataMiniGame = data;
      this.loadingService.dismiss();
      this.active_ios = data.ios_active
      if(this.active_ios == true) {
        this.dataMiniGame = data;
      }else {
        this.dataMiniGame = null;
      }
    })
  }


}
