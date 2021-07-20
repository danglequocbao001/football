import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatistPageRoutingModule } from './statist-routing.module';

import { StatistPage } from './statist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatistPageRoutingModule
  ],
  declarations: [StatistPage]
})
export class StatistPageModule {}
