import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LanguageConstants } from '../ng-p-language/common.language';

@Component({
  selector: 'app-search-bar-nav',
  templateUrl: './search-bar-nav.component.html',
  styleUrls: ['./search-bar-nav.component.scss'],
})
export class SearchBarNavComponent implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  @ViewChild('searchBar') searchBar: any;
  @Output() output = new EventEmitter<string>();
  input = '';
  hiddenSearchBar = true;
  constructor(
    public PlatForm: Platform,
  ) {
  }
  ngOnInit() {
  }
  toggleHideSearchBar(value) {
    this.hiddenSearchBar = value;
    if (!value) {
      this.searchBar.setFocus();
    }
  }
}
