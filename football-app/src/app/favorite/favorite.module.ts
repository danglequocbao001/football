import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { ListFavoriteModule } from '../@app-core/modular/list-favorite/list-favorite.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // ListFavoriteModule,
    FavoritePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [FavoritePage]
})
export class FavoritePageModule {}
