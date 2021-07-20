import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';
import { CompetitionService } from '../../../@app-core/http'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  datas
  country: any
  id
  checked: boolean = false;
  headerCustom = { title: '' };
  device
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private competitionService: CompetitionService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.country = JSON.parse(params['data'])
      this.id = this.country.country_id
      this.updateData()
    })


  }
  ionViewWillEnter (){
    if (localStorage.getItem('device') == 'true') {
      this.device = true
    } else {
      this.device = false
    }
  }
  changeStatus(id, data) {
    const request = {
      subscribe_source: {
        sourceable_id: id,
        sourceable_type: 'Competition',
        device_key: localStorage.getItem('device-key')
      }
    }
    const paramUnSub = {
      sourceable_id: id,
      sourceable_type: 'Competition',
      device_key: localStorage.getItem('device-key')
    }
    if (!data.subscribe) {
      data.subscribe = !data.subscribe;
      this.competitionService.subscribe(request).subscribe(data => {
        // this.updateData()
      })

    }
    else {
      data.subscribe = !data.subscribe;
      this.competitionService.unsubscribe(paramUnSub).subscribe(data => {
        // this.updateData()
      })
    }
  }
  updateData() {
    const request = {
      country_id: this.id
    }
    this.competitionService.getAllWithSubscribe(request).subscribe(data => {
      this.datas = data

      if (this.datas[0].country_logo == '') this.datas[0].country_logo = '../../../assets/icon/allmatch/world.svg';
    }, (error) => {
      throw error
    })
  }
  back() {
    this.router.navigate(['/setting-account/all-match'])
  }
}