import { HeaderModule } from './../../@app-core/modular/header/header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllMatchPageRoutingModule } from './all-match-routing.module';

import { AllMatchPage } from './all-match.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllMatchPageRoutingModule,
    HeaderModule
  ],
  declarations: [AllMatchPage]
})
export class AllMatchPageModule {}
