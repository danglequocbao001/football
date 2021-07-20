import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifyPage } from './notify.page';

const routes: Routes = [
  {
    path: '',
    component: NotifyPage
  },  {
    path: 'default-notify',
    loadChildren: () => import('./default-notify/default-notify.module').then( m => m.DefaultNotifyPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifyPageRoutingModule {}
