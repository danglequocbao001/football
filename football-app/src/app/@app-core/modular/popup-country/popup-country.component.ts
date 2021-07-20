import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from '../../utils';

@Component({
  selector: 'app-popup-country',
  templateUrl: './popup-country.component.html',
  styleUrls: ['./popup-country.component.scss'],
})
export class PopupCountryComponent implements OnInit {
  
  countries = [];
  @Input() countryItem;
  @Input() data_country;
  idActive = null;
  param

  constructor(
    private modalCtrl: ModalController,
    private loadingService: LoadingService

  ) { }
  ngOnInit() {
    this.idActive = this.countryItem?.country_id || 157;
    this.loadingService.dismiss()
  }
  activeCountry(value) {
    this.idActive = value.country_id
    localStorage.setItem('country_id', value.country_id)
    this.modalCtrl.dismiss(value)
  }
}
