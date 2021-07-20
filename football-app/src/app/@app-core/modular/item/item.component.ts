import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerService } from '../../http';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() data = []
  @Input() label: any
  bannerCount: number = 0
  dataItemCount: number = 0
  index
  showbanner = false
  showbannerIos = true
  bannerData: any
  device
  constructor(
    private router: Router,
    private banner: BannerService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('device') == 'true') {
      this.device = true
      this.checkBannerIos()
    } else {
      this.device = false
      this.getBanner()
    }

  }
  getBanner() {
    this.banner.getBanner().subscribe(data => {
      this.bannerData = data
    })
  }
  checkBannerIos() {
    this.banner.checkBannerIos().subscribe(data => {
      this.showbannerIos = data.active
      if (this.showbannerIos) {
        this.getBannerIos()
      }
    })
  }
  getBannerIos() {
    this.banner.getBannerIos().subscribe(data => {
      this.bannerData = data
    })
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
  bannerCheck() {
    this.bannerCount++
    if (this.bannerCount % 5 == 0) {
      if (this.dataItemCount < 5) {
        this.index = this.dataItemCount
        this.dataItemCount++
      } else {
        this.dataItemCount = 0
      }
      this.showbanner = true
    }
    else this.showbanner = false
  }


}
