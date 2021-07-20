import { LanguageConstants } from './../../@app-core/modular/ng-p-language/common.language';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage
  headerCustom = { title: this.dataLanguage.POLICY};
  checkLanguage = false

  constructor() {}

  ngOnInit() {
    if (localStorage.getItem('language') == 'English') {
      this.checkLanguage = true
    } else {
      this.checkLanguage = false
    }
  }

}
