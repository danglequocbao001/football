import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatistPage } from './statist.page';

const routes: Routes = [
  {
    path: '',
    component: StatistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatistPageRoutingModule {}
