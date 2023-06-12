import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppHeader } from './components/header/header.component';
import { AppConverter } from './components/converter/converter.component';
import { AppCurrencyField } from './components/currency-field/currency-field.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    AppConverter,
    AppCurrencyField
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
