import { LoadingService } from './../../@app-core/utils/loading.service';
import { AlertController } from '@ionic/angular';
import { AccountService } from './../../@app-core/http/account/account.service';
import { Component, OnInit } from '@angular/core';
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';

@Component({
  selector: 'app-supports',
  templateUrl: './supports.page.html',
  styleUrls: ['./supports.page.scss'],
})
export class SupportsPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  headerCustom = { title: this.dataLanguage.ASK_ANSWER, background: 'transparent' };
  questions = [];

  constructor(
    private accountService: AccountService,
    private alertController: AlertController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getSupports()
  }

  getSupports() {
    this.loadingService.present();
    this.accountService.getSupport().subscribe((data) => {
      this.questions = data;
      this.loadingService.dismiss();
    }, (error)=>{
      throw error
    })
  }

  async getAnswer(question) {
    const alert = await this.alertController.create({
      mode: 'ios',
      message: '<strong>' + question + '</strong>',
      buttons: [{ text: 'Đóng' }]
    });
    await alert.present();
  }
}
