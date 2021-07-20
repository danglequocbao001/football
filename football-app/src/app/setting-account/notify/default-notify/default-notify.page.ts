import { LanguageConstants } from './../../../@app-core/modular/ng-p-language/common.language';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-notify',
  templateUrl: './default-notify.page.html',
  styleUrls: ['./default-notify.page.scss'],
})
export class DefaultNotifyPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  headerCustom = { title: this.dataLanguage.DEFAULT_NOTIFY };
  activeNoti;
  activeDef;
  arrayNotiDefault = [
    {
      id: 0,
      name: this.dataLanguage.MATCH_EVENT,
      arrayDetail: [
        {
          id: 0,
          name: this.dataLanguage.GOALS,
          active: false,
          sound: false
        },
        {
          id: 1,
          name: this.dataLanguage.RED_CARD,
          active: false,
          sound: false
        },
        {
          id: 2,
          name: this.dataLanguage.YELLOW_CARD,
          active: false,
          sound: false
        },
        {
          id: 3,
          name: this.dataLanguage.PENALTY,
          active: false,
          sound: false
        },
      ]
    },
    {
      id: 1,
      name: this.dataLanguage.VAR_EVENT,
      arrayDetail: [
        {
          id: 0,
          name: this.dataLanguage.GOALS,
          active: false,
          sound: false
        },
        {
          id: 1,
          name: this.dataLanguage.RED_CARD,
          active: false,
          sound: false
        },
        {
          id: 3,
          name: this.dataLanguage.PENALTY,
          active: false,
          sound: false
        },
      ]
    },
    {
      id: 2,
      name: this.dataLanguage.MATCH_STATUS,
      arrayDetail: [
        {
          id: 0,
          name: this.dataLanguage.MATCH_REMIND,
          active: false,
          sound: false
        },
        {
          id: 1,
          name: this.dataLanguage.MATCH_BEGIN,
          active: false,
          sound: false
        },
        {
          id: 2,
          name: this.dataLanguage.BREAK,
          active: false,
          sound: false
        },
        {
          id: 3,
          name: this.dataLanguage.MATCH_RESULT,
          active: false,
          sound: false
        },
      ]
    },
    {
      id: 3,
      name: "Video",
      arrayDetail: [
        {
          id: 0,
          name: this.dataLanguage.COR_POINT,
          active: false,
          sound: false
        },
        {
          id: 1,
          name: this.dataLanguage.HIGHTLIGHT_ONLY,
          active: false,
          sound: false
        },

      ]
    },
    {
      id: 4,
      name: this.dataLanguage.GENERAL,
      arrayDetail: [
        {
          id: 0,
          name: this.dataLanguage.TEAM,
          active: false,
          sound: false
        },

      ]
    }
  ]
  constructor() { }

  ngOnInit() {
  }
  setNoti(item) {

    item.active = !item.active;

  }
  setSound(item) {
    item.sound = !item.sound;
  }
}
