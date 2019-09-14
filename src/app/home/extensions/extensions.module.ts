import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrenciesComponent } from './currencies/currencies.component';



@NgModule({
  declarations: [CurrenciesComponent],
  imports: [
    CommonModule
  ],
  exports: [CurrenciesComponent]
})
export class ExtensionsModule { }
