import { BannerService } from './../../http/banner/banner.service'
import { LanguageConstants } from './../ng-p-language/common.language'
import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-my-team',
  templateUrl: './list-my-team.component.html',
  styleUrls: ['./list-my-team.component.scss'],
})
export class ListMyTeamComponent implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage
  @Input() data = []
  @Input() label: any
  @Input() title: any
  @Input() search: any

  slideOpts = {
    centeredSlides: true,
    loop: true,
    autoplay: true,
    setInitialSlide: 0,
  }
  checkLanguage = false
  filterargs = {
    match_hometeam_name: '',
    match_awayteam_name: ''
  }
  bannerCount: number = 0
  dataItemCount: number = 0
  index
  showbanner: boolean = false
  bannerData: any
  constructor(
    private router: Router,
    private banner: BannerService,
  ) {

  }

  ngOnInit() {
    if (localStorage.getItem('language') == 'English') {
      this.checkLanguage = true
    } else {
      this.checkLanguage = false
    }
    this.banner.getBanner().subscribe(data => {
      this.bannerData = data
    },
      (error) => {
        throw error
      })
  }
  ionViewDidEnter() {
    
  }
  gotoDetail(item) {
    localStorage.setItem('id-macth-detail', item.match_id)
    localStorage.setItem('id-league-macth', item.league_id)
    localStorage.setItem('league-name-macth', item.league_name)
    localStorage.setItem('hometeam_name', item.match_hometeam_name)
    localStorage.setItem('awayteam_name', item.match_awayteam_name)
    this.router.navigate(['match/match'])
  }

  timeConvert(time) {
    if (localStorage.getItem('timeZone') == '12') {
      time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time]
      if (time.length > 1) {
        time = time.slice(1)
        time[5] = +time[0] < 12 ? ' AM' : ' PM'
        time[0] = +time[0] % 12 || 12
      }
      return time.join('')
    }
    else return time
  }
  bannerCheck () {
    this.bannerCount++
    if (this.bannerCount % 5 == 0) {
      if(this.dataItemCount <5){
        this.index = this.dataItemCount
        this.dataItemCount++;
      }else {
        this.dataItemCount = 0
      }
      this.showbanner = true
    }
    else this.showbanner = false
    }
}
