import { HeaderModule } from './../../../@app-core/modular/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefaultNotifyPageRoutingModule } from './default-notify-routing.module';

import { DefaultNotifyPage } from './default-notify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefaultNotifyPageRoutingModule,
    HeaderModule
  ],
  declarations: [DefaultNotifyPage]
})
export class DefaultNotifyPageModule {}
