import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiniGamePageRoutingModule } from './mini-game-routing.module';

import { MiniGamePage } from './mini-game.page';
import { HeaderModule } from 'src/app/@app-core/modular/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiniGamePageRoutingModule,
    HeaderModule
  ],
  declarations: [MiniGamePage]
})
export class MiniGamePageModule {}
