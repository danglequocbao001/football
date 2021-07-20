import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';
import { AuthService } from '../../../@app-core/http';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  newPassword = new FormGroup({
    new_password: new FormControl(''),
    new_password_confirmation: new FormControl(''),
  });
  device
  typePass = 'password'
  namePass = 'eye-outline' 
  showpass = false
  typePassCon = 'password'
  namePassCon = 'eye-outline' 
  showpassCon = false
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if(localStorage.getItem('device') == 'true') {
      this.device = true
    }else {
      this.device = false
    }
  }
  back() {
    this.router.navigate(['/auth/forgot-password']);
  }
  next(){
   
    this.authService.newPassword(this.newPassword.value).subscribe(()=>{
      this.router.navigate(['/auth/login']);
    },
    (error)=>{
      throw error
    });
  }
  toLogin(){
    this.router.navigate(['/auth/login']);    
  }
  showPass(){
    this.showpass = !this.showpass;
    if (this.showpass) {
      this.typePass = 'text';
      this.namePass = 'eye-off-outline'
    }
    else {
      this.typePass = 'password';
      this.namePass = 'eye-outline'
    }
  }
  showPassCon(){
   
    this.showpassCon = !this.showpassCon;
    if (this.showpassCon) {
      this.typePassCon = 'text';
      this.namePassCon = 'eye-off-outline'
    }
    else {
      this.typePassCon = 'password';
      this.namePassCon = 'eye-outline'
    }
  }

}
