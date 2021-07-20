import { LanguageConstants } from './../../@app-core/modular/ng-p-language/common.language';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../@app-core/http';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  forgotPassword= new FormGroup({
    email: new FormControl(''),
  })
  device
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() { 
    if(localStorage.getItem('device') == 'true') {
    this.device = true
  }else {
    this.device = false
  }

  }
  async onSubmit(){
    
  }
  back(){
    this.router.navigate(['/auth/login']);
  }
  ionViewWillLeave(){
    this.forgotPassword.get('email').setValue('')
  }
  next(){
    this.authService.forgotPassword(this.forgotPassword.value).subscribe(
      (data:any)=>{
        this.router.navigate(['/auth/forgot-password/email-confirm']);
      },
      (error)=>{
        throw error
      }
    )
      
  }
}
