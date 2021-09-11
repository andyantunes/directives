import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CepDirective } from './cep';
import { EmailDirective } from './email';
import { NameDirective } from './name';
import { PasswordDirective } from './password';
import { PhoneDirective } from './phone';

@NgModule({
  declarations: [CepDirective, EmailDirective, NameDirective, PasswordDirective, PhoneDirective],
  imports: [CommonModule],
  exports: [CepDirective, EmailDirective, NameDirective, PasswordDirective, PhoneDirective],
})
export class DirectivesModule {}
