import { LanguageConstants } from './../@app-core/modular/ng-p-language/common.language';
import { Component } from '@angular/core';
import { NewsService } from '../@app-core/http';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  dataLanguage = LanguageConstants.dataLanguage;
  device
  newActive = true
  titleNew = this.dataLanguage.NEWS
  constructor(
    private newService: NewsService
  ) {}
  ionViewWillEnter() {
    if(localStorage.getItem('device') == 'true') {
      this.device = true
      this.getActiveNews()
    }else {
      this.device = false
    }
  }
  getActiveNews() {
    this.newService.getActiveNewsInScore().subscribe(data => {
      this.newActive = data?.active
      if (this.newActive) this.titleNew = this.dataLanguage.NEWS
      else this.titleNew = ''
        
    })
  }
}
