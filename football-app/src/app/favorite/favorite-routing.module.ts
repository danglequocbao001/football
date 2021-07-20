import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseOrtherPage } from '../choose-orther/choose-orther.page';

import { FavoritePage } from './favorite.page';

const routes: Routes = [
  {
    path: '',
    component: FavoritePage
  },
  {
    path: 'choose-orther',
    component: ChooseOrtherPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritePageRoutingModule {}
