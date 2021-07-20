import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultNotifyPage } from './default-notify.page';

const routes: Routes = [
  {
    path: '',
    component: DefaultNotifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultNotifyPageRoutingModule {}
