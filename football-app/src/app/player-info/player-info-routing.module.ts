import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayerInfoPage } from './player-info.page';

const routes: Routes = [
  {
    path: '',
    component: PlayerInfoPage
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'statist',
    loadChildren: () => import('./statist/statist.module').then( m => m.StatistPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerInfoPageRoutingModule {}
