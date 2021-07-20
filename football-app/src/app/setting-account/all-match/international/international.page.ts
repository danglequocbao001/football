import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CompetitionService } from 'src/app/@app-core/http';
import { ModalTeamComponent } from 'src/app/@app-core/modular/modal-team/modal-team.component';
import { LoadingService } from 'src/app/@app-core/utils';
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';

@Component({
  selector: 'app-international',
  templateUrl: './international.page.html',
  styleUrls: ['./international.page.scss'],
})
export class InternationalPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  headerCustom: any;
  arrayCountryID = [
    {
      id: 168,
      name: this.dataLanguage.INTERNATIONAL,
      arrayLimit: [],
      arrayItem: [],
    },
    {
      id: 166,
      name: this.dataLanguage.NORTH_AMERICA,
      arrayLimit: [],
      arrayItem: [],
    },
    {
      id: 163,
      name: this.dataLanguage.ASIA,
      arrayLimit: [],
      arrayItem: [],
    },
    {
      id: 165,
      name: this.dataLanguage.EUROPE,
      arrayLimit: [],
      arrayItem: [],
    },
    {
      id: 164,
      name: this.dataLanguage.OCEANIA,
      arrayLimit: [],
      arrayItem: [],
    },
    {
      id: 162,
      name: this.dataLanguage.AFRICA,
      arrayLimit: [],
      arrayItem: [],
    },
    {
      id: 154,
      name: this.dataLanguage.USA,
      arrayLimit: [],
      arrayItem: [],
    },
    {
      id: 167,
      name: this.dataLanguage.SOUTH_AMERICA,
      arrayLimit: [],
      arrayItem: [],
    },
  ]
  constructor(
    private route: ActivatedRoute,
    private competitonService: CompetitionService,
    private modalCtrl: ModalController,
    private LoadingService: LoadingService
  ) { }

  ngOnInit() {
    this.LoadingService.present();
    this.route.queryParams.subscribe(data => {
      this.headerCustom = { title: data.data };
    })
    if (this.headerCustom.title.includes('Đội tuyển quốc gia') || this.headerCustom.title == "National team") {
      this.arrayCountryID.forEach(element => {
        this.competitonService.getAllWithSubscribe({ country_id: element.id }).subscribe((data => {
          element['arrayItem'] = data;
          element['arrayLimit'] = data.slice(0, 3);
          this.LoadingService.dismiss()
        }), (error)=>{
          throw error
        })
      });
    }
    if (this.headerCustom.title.includes('Câu lạc bộ quốc tế') || this.headerCustom.title == "International club") {
      this.arrayCountryID.forEach(element => {
        this.competitonService.getAllInternation({ country_id: element.id }).subscribe((data => {
          element['arrayItem'] = data;
          element['arrayLimit'] = data.slice(0, 3);
          this.LoadingService.dismiss();
        }), (error)=>{
          throw error
        })
      });
    }


  }
  clickSub(item) {
    const res = {
      subscribe_source: {
        sourceable_id: item.league_id,
        sourceable_type: "Competition",
        device_key: localStorage.getItem('device-key')
      }

    }


    if (item.subscribe) {
      this.competitonService.unsubscribe(res['subscribe_source']).subscribe((data) => {

        item.subscribe = !item.subscribe;
      }, (error)=>{
        throw error
      })
    } else {
      this.competitonService.subscribe(res).subscribe((data) => {

        item.subscribe = !item.subscribe;
      }, (error)=>{
        throw error
      })
    }
  }
  async showMore(value) {

    const popover = await this.modalCtrl.create({
      component: ModalTeamComponent,
      swipeToClose: true,
      cssClass: 'modalTeam',
      componentProps: {
        data_team: value.arrayItem,
        title_team: value.name
      }
    });
    popover.onDidDismiss()
    // .then((data) => {
    //   const country = data['data']; // Here's your selected user!
    //   this.itemCountry = country;
    //   this.param.subscribe_source.sourceable_id = localStorage.getItem('country_id')
    //   this.subCountry()
    // });

    return await popover.present();
  }
}
