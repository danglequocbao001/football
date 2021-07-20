import { LanguageConstants } from './../../@app-core/modular/ng-p-language/common.language';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-time-zone',
  templateUrl: './time-zone.page.html',
  styleUrls: ['./time-zone.page.scss'],
})
export class TimeZonePage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  activeTimeZone;
  timeZones = [
    { name: '24' },
    { name: '12' },
  ];
  selectedtimeZone = '';
  constructor
    (
      private modalCtrl: ModalController,
  ) {
    this.activeTimeZone = localStorage.getItem('timeZone');
  }

  ngOnInit() {
    if (localStorage.getItem("timeZone") === null) {

      localStorage.setItem('timeZone', '12')
    }
    this.getTimeZone();
  }
  getTimeZone() {
    this.selectedtimeZone = localStorage.getItem('timeZone');
  }

  setTimeZone(name) {
    localStorage.setItem('timeZone', name);
    name == '24' ? localStorage.setItem('timeZone', '24') : localStorage.setItem('timeZone', '12');
    this.activeTimeZone = name;
    setTimeout(() => {
      this.modalCtrl.dismiss();
    },300);
  }

}
