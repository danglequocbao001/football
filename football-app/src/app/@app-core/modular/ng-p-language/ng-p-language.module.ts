import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPLanguageService } from './ng-p-language.service';
import { NgPLanguageComponent } from './ng-p-language.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NgPLanguageComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NgPLanguageComponent, CommonModule]
})
export class NgPLanguageModule {}
