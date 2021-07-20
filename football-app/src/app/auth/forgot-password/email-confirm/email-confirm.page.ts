import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageConstants } from 'src/app/@app-core/modular/ng-p-language/common.language';
import { AuthService } from '../../../@app-core/http/index';
@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.page.html',
  styleUrls: ['./email-confirm.page.scss'],
})
export class EmailConfirmPage implements OnInit {
  dataLanguage = LanguageConstants.dataLanguage;
  inputCode = new FormGroup({
    code1: new FormControl(''),
    code2: new FormControl(''),
    code3: new FormControl(''),
    code4: new FormControl(''),
    code5: new FormControl(''),
    code6: new FormControl(''),
  })
  device
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
  nextTab(event, prevInput, fieldInput, nextInput){ 
    nextInput.setFocus();
  }
  back(){
    this.router.navigate(['/auth/login']);
  }
  next(){
    this.router.navigate(['/auth/forgot-password/new-password']);
    var c1 = this.inputCode.get('code1').value;
    var c2 = this.inputCode.get('code2').value;
    var c3 = this.inputCode.get('code3').value;
    var c4 = this.inputCode.get('code4').value;
    var c5 = this.inputCode.get('code5').value;
    var c6 = this.inputCode.get('code6').value;
    var inputstring = `${c1}${c2}${c3}${c4}${c5}${c6}`;
    
    const data={
      code: inputstring
    }
    this.authService.checkcodePassword(data).subscribe(
      ()=>{
        this.router.navigate(['/auth/forgot-password/new-password']);
      },
      (error)=>{
        throw error
      }
    );
  }
}
