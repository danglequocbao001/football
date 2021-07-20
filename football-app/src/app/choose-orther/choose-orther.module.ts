import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChooseOrtherPageRoutingModule } from './choose-orther-routing.module';
import { ChooseOrtherPage } from './choose-orther.page';
import { ListTeamModule } from '../@app-core/modular/list-team/list-team.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTeamModule,
    ChooseOrtherPageRoutingModule,
  ],
  declarations: [ChooseOrtherPage]
})
export class ChooseOrtherPageModule {}
