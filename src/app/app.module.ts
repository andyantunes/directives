import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CepDirective } from './directives/cep';
import { PhoneDirective } from './directives/phone';
import { EmailDirective } from './directives/email';
import { NameDirective } from './directives/name/name.directive';

@NgModule({
  declarations: [AppComponent, CepDirective, PhoneDirective, EmailDirective, NameDirective],
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
