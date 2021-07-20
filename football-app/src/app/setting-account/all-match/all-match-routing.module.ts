import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllMatchPage } from './all-match.page';

const routes: Routes = [
  {
    path: '',
    component: AllMatchPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'international',
    loadChildren: () => import('./international/international.module').then( m => m.InternationalPageModule)
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllMatchPageRoutingModule {}
