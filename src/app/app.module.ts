import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DirectivesModule } from './directives';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, DirectivesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
