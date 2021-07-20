import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingAccountPage } from './setting-account.page';

const routes: Routes = [
  {
    path: '',
    component: SettingAccountPage
  },
  {
    path: 'all-match',
    loadChildren: () => import('./all-match/all-match.module').then( m => m.AllMatchPageModule)
  },
  {
    path: 'notify',
    loadChildren: () => import('./notify/notify.module').then( m => m.NotifyPageModule)
  },
  {
    path: 'supports',
    loadChildren: () => import('./supports/supports.module').then( m => m.SupportsPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.module').then( m => m.PolicyPageModule)
  },  {
    path: 'languages',
    loadChildren: () => import('./languages/languages.module').then( m => m.LanguagesPageModule)
  },
  {
    path: 'time-zone',
    loadChildren: () => import('./time-zone/time-zone.module').then( m => m.TimeZonePageModule)
  },
  {
    path: 'mini-game',
    loadChildren: () => import('./mini-game/mini-game.module').then( m => m.MiniGamePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingAccountPageRoutingModule {}
