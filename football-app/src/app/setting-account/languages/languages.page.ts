import { LoadingService } from './../../@app-core/utils/loading.service';
import { LanguageConstants } from './../../@app-core/modular/ng-p-language/common.language';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  headerCustom = { title: this.dataLanguage.LANGUAGES };
  activeLanguage;
  languages = [
    { name: 'Vietnamese' },
    { name: 'English' },
  ];
  constructor(
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.activeLanguage = localStorage.getItem('language');
  }
  ngOnInit() {
  }
  setLanguage(name) {
    if (name == 'Vietnamese') localStorage.setItem('language', 'Vietnamese');
    else  localStorage.setItem('language', 'English');
    this.activeLanguage = name;
  }

  confirm() {
    this.loadingService.present();
    setTimeout(() => {
      this.router.navigate(['/setting-account']);
      setTimeout(() => {
        location.reload();
      })
    },300)
  }
}
