import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScorePageRoutingModule } from './score-routing.module';

import { ScorePage } from './score.page';
import { ItemModule } from '../@app-core/modular/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScorePageRoutingModule,
    ItemModule
  ],
  declarations: [ScorePage]
})
export class ScorePageModule {}
