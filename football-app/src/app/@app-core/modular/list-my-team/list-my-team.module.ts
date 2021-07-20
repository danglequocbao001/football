import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMyTeamComponent } from './list-my-team.component';



@NgModule({
  declarations: [ListMyTeamComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ListMyTeamComponent]
})
export class ListMyTeamModule { }
