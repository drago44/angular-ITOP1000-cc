import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppHeader } from './components/header/header.component';
import { AppConverter } from './components/converter/converter.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, AppHeader, AppConverter],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
