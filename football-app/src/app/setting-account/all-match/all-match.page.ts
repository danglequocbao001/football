import { LoadingService } from './../../@app-core/utils/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';
import { CompetitionService } from '../../@app-core/http'
@Component({
  selector: 'app-all-match',
  templateUrl: './all-match.page.html',
  styleUrls: ['./all-match.page.scss'],
})
export class AllMatchPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  headerCustom = { title: this.dataLanguage.ALL_MATCH };
  countries: any;
  ArrayTeam = [
    {
      url: 'international',
      title: this.dataLanguage.NATIONAL_TEAM
    },
    {
      url: 'international',
      title: this.dataLanguage.INTER_CLUB
    }
  ]
  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.competitionService.getAllCountries().subscribe(data => {
      this.countries = data;
      let tempCountries = [];
      for (let country of this.countries) {
        if (
          country.country_name == 'Vietnam' ||
          country.country_name == 'England' ||
          country.country_name == 'Portugal' ||
          country.country_name == 'Spain' ||
          country.country_name == 'Germany' ||
          country.country_name == 'Italy' ||
          country.country_name == 'France') {
          tempCountries.push(country);
          const index = this.countries.indexOf(country);
          this.countries.splice(index, 1)
        }
      }
      this.countries = tempCountries.concat(this.countries);
      this.loadingService.dismiss();
    }), (error)=>{
      throw error
    }
  }
  gotoDetail(country) {
    // this.router.navigate(['/setting-account/all-match/detail'], country )
    this.router.navigate(['setting-account/all-match/detail'], {
      queryParams: {
        data: JSON.stringify(country)
      }
    })
  
  }
  gotoUrl(item) {
    this.router.navigate(['setting-account/all-match/' + item.url], {
      queryParams: {
        data: item.title,
      }
    })
  }
  back() {
    this.router.navigate(['setting-account']);
  }
}
