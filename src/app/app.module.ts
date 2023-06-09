import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppHeader } from './components/header/header.component';
import { AppConverter } from './components/converter/converter.component';
import { AppCurrencyInput } from './components/currency-input/currency-input.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, AppHeader, AppConverter, AppCurrencyInput],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
