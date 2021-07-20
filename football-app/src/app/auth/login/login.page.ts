import { FacebookLoginService } from './../../@app-core/http/facebook-login/facebook-login.service';
import { LanguageConstants } from './../../@app-core/modular/ng-p-language/common.language';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../@app-core/http';
import { LoadingService } from 'src/app/@app-core/utils';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  headerCustom = { title: '', background: 'transparent' };
  type = 'password';
  public showpass = false;
  public name = 'eye-outline';
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  public showSpinner = false;
  isOnline: boolean;
  device
  constructor(
    private router: Router,
    public alertCtrl: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    private loadingServie: LoadingService,
    private facebookservice: FacebookLoginService,
    private facebook: Facebook
  ) { }

  ngOnInit() {
    if(localStorage.getItem('device') == 'true') {
      this.device = true
    }else {
      this.device = false
    }
  }
  back() {
    this.router.navigate(['/setting-account'])
  }
  async presentAlert(text: string) {
    const alert = await this.alertCtrl.create({
      header: 'Warning',
      message: text,
      buttons: [{
        text: 'Agree',
        role: 'ok'
      }]
    });
    await alert.present();
  }
  async onSubmit() {
    this.showSpinner = true;
    if (this.profileForm.value.email === '') {
      this.showSpinner = false
      this.presentAlert('Please enter your email');
    } else if (this.profileForm.value.password === '') {
      this.showSpinner = false
      this.presentAlert('Please enter your password');
    }
    this.loadingServie.present()
    this.authService.login(this.profileForm.value).subscribe(
      (data: any) => {
        this.loadingServie.dismiss()
        this.showSpinner = false;
        this.router.navigateByUrl('/auth/login');
        window.location.assign('/');
      },
      (error) => {
        this.showSpinner = false;
        throw error
      }
    )
  }

  forgotPassword() {
    this.router.navigate(['auth/forgot-password']);
  }
  signup() {
    this.router.navigate(['/auth/signup']);
  }
  showPass() {
    this.showpass = !this.showpass;
    if (this.showpass) {
      this.type = 'text';
      this.name = 'eye-off-outline'
    }
    else {
      this.type = 'password';
      this.name = 'eye-outline'
    }
  }
  loginViaFacebook() {
    this.facebook.login(['public_profile', 'user_friends', 'email']).then((
      response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(
        (res) => {
          const request = {
            user: {
              full_name: res.name,
              facebook_id: res.id,
              device_key: localStorage.getItem('device-key'),
              avatar: res.picture_large.data.url
            }
          }
          this.facebookservice.loginViaFacebook(request).subscribe((res) => {
            localStorage.setItem('Authorization', res.token);
            localStorage.setItem('device-key', res.device_key);
            this.router.navigate(['/score'])
          })
        }
      )
    }
    )
    this.router.navigate['home'];
  }
}
