import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalTeamComponent } from './modal-team.component';



@NgModule({
  declarations: [ModalTeamComponent],
  imports: [
    CommonModule,
    Ng2SearchPipeModule
  ],
  exports: [
    ModalTeamComponent
  ]
})
export class ModalTeamModule { }
