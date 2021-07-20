import { HeaderModule } from './../../@app-core/modular/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifyPageRoutingModule } from './notify-routing.module';

import { NotifyPage } from './notify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifyPageRoutingModule,
    HeaderModule
  ],
  declarations: [NotifyPage]
})
export class NotifyPageModule {}
