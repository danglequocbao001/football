import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService, CompetitionService, FavoriteService, NewsService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { SendDataService } from '../@app-core/utils/sendData.service';
import { AlertController, Platform } from '@ionic/angular';
import { LanguageConstants } from '../@app-core/modular/ng-p-language/common.language';
@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  headers = new HttpHeaders();
  headersParam = null;
  img = ''
  listTeam = []
  listLeague
  listPlayer = []
  checkAllTeam = false
  checkAllLeague = false
  checkAllPlayer = false
  private backButton: any
  imgTeamActive
  imgLeagueActive
  imgLeagueSrc
  imgTeamSrc
  imgPlayerSrc
  imgPlayerActive
  imgTeam = ''
  imgLeague = ''
  imgPlayer = ''
  search = ''
  bannerData = []
  request = {
    subscribe_source: {
      sourceable_type: '',
      sourceable_id: '',
      notification: false
    }
  }
  paramSearch = {
    q: '',
    page: 1,
    per_page: 10
  }
  slideOpts = {
    centeredSlides: true,
    loop: true,
    autoplay: true
  }
  device
  favoriteLeague: any
  list
  newActive = true
  constructor(
    private favoriteService: FavoriteService,
    private loadingService: LoadingService,
    private sendDataService: SendDataService,
    private router: Router,
    private competionService: CompetitionService,
    private alertController: AlertController,
    private platform: Platform,
    private banner: BannerService,
    private newService: NewsService

  ) {
  }

  async ngOnInit() {
    this.imgTeamActive = this.imgLeagueActive = this.imgPlayerActive = 'assets/img/bell.svg'
    this.imgTeamSrc = this.imgLeagueSrc = this.imgPlayerSrc = 'assets/img/belloff.svg'
   
  }
  
  ionViewWillEnter() {
    this.getDataTeam()
    this.getDataLeague()
    this.getDataPlayer()
    // const tabs = document.querySelectorAll('ion-tab-bar');
    // Object.keys(tabs).map((key) => {
    //   tabs[key].style.display = 'flex';
    // });
    if(localStorage.getItem('device') == 'true') {
      this.getActiveNews()
      this.device = true
    }else {
      this.device = false
    }
    this.banner.getBanner().subscribe(data => {
      this.bannerData = data;
      if(this.device){
          this.checkBannerIos()
      }
    },
      (error) => {
        throw error
      });
  }
  getBannerIos() {
    this.banner.getBannerIos().subscribe( data =>{
      this.bannerData = data
    })
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

  ionViewDidLeave() {
    this.backButton.unsubscribe()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      cssClass: 'logout-alert',
      message: this.dataLanguage.EXIT_APP,
      buttons: [
        {

          text: this.dataLanguage.YES,
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: this.dataLanguage.NO,
          handler: () => {
            alert.dismiss()
            return;
          }
        },
      ]
    });
    await alert.present()
  }
  ionViewDidEnter() {
    this.backButton = this.platform.backButton.subscribe(() => {
    })
  }
 
  ionViewWillLeave() {
    this.backButton.unsubscribe()
  }

  getDataTeam() {
    this.loadingService.present();
    this.favoriteService.getTeamsFavorite(this.headersParam).subscribe(data => {
      localStorage.setItem('listFavoriteTeam', JSON.stringify(data))
      this.loadingService.dismiss()
      this.listTeam = data
      if (this.checkListTeam()) {
        this.checkAllTeam = true
      }
      else {
        this.checkAllTeam = false
      }
    },
      (error) => {
        throw error
      })
  }
  getDataPlayer() {
    this.loadingService.present();
    this.favoriteService.getLeaguePlayers(this.headersParam).subscribe(data => {
      localStorage.setItem('listFavoritePlayer', JSON.stringify(data))

      this.loadingService.dismiss()
      this.listPlayer = data
      if (this.checkListTeam()) {
        this.checkAllPlayer = true
      }
      else {
        this.checkAllPlayer = false
      }
    })
  }

  getDataLeague() {
    this.loadingService.present();
    this.favoriteService.getLeagueFavorite(this.headersParam).subscribe(data => {
      this.listLeague = data
      this.loadingService.dismiss();
      if (this.checkListPlayers()) {
        this.checkAllLeague = true
      }
      else {
        this.checkAllLeague = false
      }
    }, (error) => {
      throw error
    })
  }

  searchResult() {
    this.competionService.search(this.paramSearch).subscribe((data) => {
    })
  }

  checkListPlayers(): Boolean {
    return this.listPlayer.every(item => {
      return item.notification == true;
    });
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

  myChangePlayer(item) {
    if (this.checkListPlayers() == true) {
      this.checkAllPlayer = true;
    }
    if (this.checkListPlayers() == false) {
      this.checkAllPlayer = false;
    }
    this.request.subscribe_source.sourceable_type = "Player"
    this.request.subscribe_source.sourceable_id = item.id
    this.request.subscribe_source.notification = item.notification
    this.favoriteService.noti(this.request, this.headersParam).subscribe((data: any) => {
    }, (error) => {
      throw error
    })
  }
  myChangeTeam(item) {
    if (this.checkListTeam() == true) {
      this.checkAllTeam = true;
    }
    if (this.checkListTeam() == false) {
      this.checkAllTeam = false;
    }
    this.request.subscribe_source.sourceable_type = "Team"
    this.request.subscribe_source.sourceable_id = item.id
    this.request.subscribe_source.notification = item.notification
    this.favoriteService.noti(this.request, this.headersParam).subscribe((data: any) => {
    }, (error) => {
      throw error
    })
  }
  myChangeLeague(item) {
    if (this.checkListLeague() == true) {
      this.checkAllLeague = true;
    }
    if (this.checkListLeague() == false) {
      this.checkAllLeague = false;
    }
    this.request.subscribe_source.sourceable_type = "Competition"
    this.request.subscribe_source.sourceable_id = item.id
    this.request.subscribe_source.notification = item.notification
    this.favoriteService.noti(this.request, this.headersParam).subscribe((data: any) => {
    }, (error) => {
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
    this.checkAllTeam = !this.checkAllTeam;

    this.listTeam.forEach((item) => {
      item.notification = this.checkAllTeam;

    })
    this.favoriteService.notiAll(this.request, this.headersParam).subscribe((data) => {
      // this.getDataTeam()
    }, (error) => {
      throw error
    })
  }
  toggleAllPlayerClick() {
    if (this.checkListPlayers()) {
      this.request.subscribe_source.notification = false
    }
    else {
      this.request.subscribe_source.notification = true
    }
    this.request.subscribe_source.sourceable_type = "Player"
    this.checkAllPlayer = !this.checkAllPlayer;

    this.listPlayer.forEach((item) => {
      item.notification = this.checkAllPlayer;
    })
    this.favoriteService.notiAll(this.request, this.headersParam).subscribe((data) => {
      // this.getDataLeague()
    }, (error) => {
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
    this.checkAllLeague = !this.checkAllLeague;

    this.listLeague.forEach((item) => {
      item.notification = this.checkAllLeague;

    })

    this.favoriteService.notiAll(this.request, this.headersParam).subscribe((data) => {
      // this.getDataLeague()
    }, (error) => {
      throw error
    })
  }
  gotoSearch() {
    let data = {
      from: 'favorite'
    }
    this.router.navigate(['/search'], {
      queryParams: {
        data: JSON.stringify(data)
      }
    })
  }
  gotodetail(id) {
    this.router.navigate(['player-info'], {
      queryParams: {
        data: JSON.stringify(id)
      }
    })
  }
  goTeamOrther() {
    let param = {
      type: "Team",
      info: "TeamSuggetion",
      from: 'favorite'
    }
    this.router.navigateByUrl("/choose-orther");
    this.sendDataService.sendData(param)
  }
  goLeagueOrther() {
    let param = {
      type: "League",
      info: "LeagueSuggetion",
      from: 'favorite'

    }
    this.router.navigateByUrl("/choose-orther");
    this.sendDataService.sendData(param)
  }
  goPlayerOrther() {
    let param = {
      type: "Player",
      info: "PlayerSuggetion",
      from: 'favorite'
    }
    this.router.navigateByUrl("/choose-orther");
    this.sendDataService.sendData(param)

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
