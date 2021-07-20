import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() headerCustom: { title?: String, background?: String, color?: String};
  device
  constructor(
    private router: Router
  ) { }

  ngOnInit() { 
    if(localStorage.getItem('device') == 'true') {
      this.device = true
    }else {
      this.device = false
    }
  }
  ionViewWillEnter() {
  
  }
}
