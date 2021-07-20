import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { PopupCountryComponent } from '../@app-core/modular/popup-country/popup-country.component';
import { NgPLanguageComponent } from '../@app-core/modular/ng-p-language/ng-p-language.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

  ],
  providers: [
  ],
  declarations: [HomePage, PopupCountryComponent,NgPLanguageComponent]

})
export class HomePageModule { }
