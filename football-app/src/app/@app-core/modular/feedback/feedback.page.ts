import { LoadingService } from './../../utils/loading.service';
import { ModalController, AlertController } from '@ionic/angular';
import { AccountService } from './../../http/account/account.service';
import { Component, OnInit } from '@angular/core';
import { LanguageConstants } from '../ng-p-language/common.language';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  note = '';

  constructor(
    private accountService: AccountService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
  }

  changeNote(note) {
    this.note = note;
  }

  setNote() {
    this.loadingService.present();
    let param = {
      feedback: {
        content: this.note
      }
    }
    this.accountService.setNote(param).subscribe(() => {
      this.presentAlert();
      this.loadingService.dismiss()
    })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: this.dataLanguage.SEND_SUC,
      mode: 'ios',
      buttons: [
        {
          text: this.dataLanguage.CLOSE,
          handler: (() => {
            this.modalCtrl.dismiss();
          })
        },
        {
          text: this.dataLanguage.SEND_MORE,
          handler: (() => {
            this.note = '';
          })
        }
      ]
    });
    await alert.present();
  }
}
