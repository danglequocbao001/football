import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeZonePageRoutingModule } from './time-zone-routing.module';

import { TimeZonePage } from './time-zone.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeZonePageRoutingModule
  ],
  declarations: [TimeZonePage]
})
export class TimeZonePageModule {}
