import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'match',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tournaments',
    loadChildren: () => import('./tournaments/tournaments.module').then( m => m.TournamentsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'player-info',
    loadChildren: () => import('./player-info/player-info.module').then( m => m.PlayerInfoPageModule)
  },
  // {
  //   path: 'setting',
  //   loadChildren: () => import('./setting-account/setting-account.module').then( m => m.SettingAccountPageModule)
  // },
  // {
  //   path: 'setting',
  //   loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  // },
  {
    path: 'setting-account',
    loadChildren: () => import('./setting-account/setting-account.module').then( m => m.SettingAccountPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./@app-core/modular/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'my-team',
    loadChildren: () => import('./my-team/my-team.module').then( m => m.MyTeamPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'score',
    loadChildren: () => import('./score/score.module').then( m => m.ScorePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
 
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then( m => m.FavoritePageModule)
  },
  {
    path: 'choose-orther',
    loadChildren: () => import('./choose-orther/choose-orther.module').then( m => m.ChooseOrtherPageModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
