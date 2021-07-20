import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailConfirmPageRoutingModule } from './email-confirm-routing.module';

import { EmailConfirmPage } from './email-confirm.page';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailConfirmPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmailConfirmPage]
})
export class EmailConfirmPageModule {}
