import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';
import { AuthService } from '../../@app-core/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl('')
  })
  
  public showSpinner = false;
  device
  constructor(
    private router: Router,
    public alertCtrl: AlertController,
    private toastController: ToastController,
    private authService: AuthService
  ) { }
    
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
    const signupData = {
      user: {
        email: this.signupForm.value.email,
        full_name: this.signupForm.value.email,
        device_key: localStorage.getItem("device-key"),
        password: this.signupForm.value.password,
        password_confirmation: this.signupForm.value.password_confirmation
      }
    }
    
    
    this.showSpinner = true;
    if (this.signupForm.value.email === '') {
      this.showSpinner = false
      this.presentAlert('Please enter your email');
    } else if (this.signupForm.value.password === '') {
      this.showSpinner = false
      this.presentAlert('Please enter your password');
    }
    else if(this.signupForm.value.password_confirmation === '') {
      this.showSpinner = false;
      this.presentAlert('Please confirm your password');
    }
    this.authService.signup(signupData).subscribe(
      (data: any) => {
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

  ngOnInit() {
    if(localStorage.getItem('device') == 'true') {
      this.device = true
    }else {
      this.device = false
    }
  }
  back(){
    this.router.navigate(['/auth/login']);
  }
}
  