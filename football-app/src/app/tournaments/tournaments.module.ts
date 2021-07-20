import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsPageRoutingModule } from './tournaments-routing.module';

import { TournamentsPage } from './tournaments.page';
import { ListTeamModule } from '../@app-core/modular/list-team/list-team.module';
import { HeaderModule } from '../@app-core/modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsPageRoutingModule,
    ListTeamModule,
    HeaderModule
  ],
  declarations: [TournamentsPage]
})
export class TournamentsPageModule {}
