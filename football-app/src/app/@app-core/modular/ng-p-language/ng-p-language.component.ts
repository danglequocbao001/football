import { LoadingService } from './../../utils/loading.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgPLanguageService } from './ng-p-language.service';

@Component({
  selector: 'app-ng-p-language',
  templateUrl: './ng-p-language.component.html',
  styleUrls: ['./ng-p-language.component.scss']
})
export class NgPLanguageComponent implements OnInit {
  public arrLanguage = [];
  public choiceLanguage = '';
  constructor(
    private ngPLanguageService: NgPLanguageService,
    private modalCtrl: ModalController,
    private loadingService: LoadingService
  ) {
  }
  idActive = '';
  @Input() itemLanguage; 
  ngOnInit(): void {
    this.idActive=this.itemLanguage;
    this.ngPLanguageService.getArrLanguage.subscribe((data: any) => {
      this.arrLanguage = data;

      this.choiceLanguage = this.ngPLanguageService.getSelectedLanguage();
    },
    (error)=>{
      throw error
    })
  }

  selectLanguage(item) {
    this.idActive = item;
    this.modalCtrl.dismiss(item);
    this.ngPLanguageService.setSelectedLanguage(item);
    this.ngPLanguageService.loadFileLanguage();
  }

}
