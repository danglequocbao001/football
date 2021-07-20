import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFavoriteComponent } from './list-favorite.component';



@NgModule({
  declarations: [ListFavoriteComponent],
  exports: [ListFavoriteComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ListFavoriteModule { }
