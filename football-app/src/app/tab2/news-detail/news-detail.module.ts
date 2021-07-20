import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from 'src/app/@app-core/modular/header/header.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderModule
  ]
})
export class NewsDetailModule { }
