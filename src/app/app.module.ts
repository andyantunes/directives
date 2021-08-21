import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CepDirective } from './directives/cep/cep.directive';
import { PhoneDirective } from './directives/phone/phone.directive';

@NgModule({
  declarations: [AppComponent, CepDirective, PhoneDirective],
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
