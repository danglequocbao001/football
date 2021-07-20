import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternationalPageRoutingModule } from './international-routing.module';

import { InternationalPage } from './international.page';
import { HeaderModule } from 'src/app/@app-core/modular/header/header.module';
import { ModalTeamComponent } from 'src/app/@app-core/modular/modal-team/modal-team.component';
import { ModalTeamModule } from 'src/app/@app-core/modular/modal-team/modal-team.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternationalPageRoutingModule,
    HeaderModule,
    ModalTeamModule
  ],
  declarations: [InternationalPage, ModalTeamComponent]
})
export class InternationalPageModule { }
