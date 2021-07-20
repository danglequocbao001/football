import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportsPage } from './supports.page';

const routes: Routes = [
  {
    path: '',
    component: SupportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportsPageRoutingModule {}
