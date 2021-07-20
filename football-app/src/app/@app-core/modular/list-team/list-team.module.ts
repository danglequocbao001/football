import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTeamComponent } from './list-team.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [ListTeamComponent],
  imports: [
    CommonModule,
    Ng2SearchPipeModule
  ],
  exports: [
      ListTeamComponent
  ]
})
export class ListTeamModule { }
