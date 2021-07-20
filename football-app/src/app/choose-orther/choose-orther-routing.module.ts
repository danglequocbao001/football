import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseOrtherPage } from './choose-orther.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseOrtherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseOrtherPageRoutingModule {}
