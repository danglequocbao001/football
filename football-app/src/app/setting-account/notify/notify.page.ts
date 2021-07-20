import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
})
export class NotifyPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  headerCustom = { title: this.dataLanguage.NOTIFICATION };
  checked = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

  }

  back() {
    this.router.navigate(['/setting-account']);
  }

  turnOnAll() {
    if(this.checked == false) this.checked = true;
    else this.checked = false;
  }

}
