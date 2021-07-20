import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTeamPageRoutingModule } from './my-team-routing.module';

import { MyTeamPage } from './my-team.page';
import { ListMyTeamModule } from '../@app-core/modular/list-my-team/list-my-team.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTeamPageRoutingModule,
    ListMyTeamModule
  ],
  declarations: [MyTeamPage]
})
export class MyTeamPageModule {}
