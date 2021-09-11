import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { EmailOptions } from './email.model';

const DEFAULT_OPTIONS: EmailOptions = {
  errColor: '#f00',
};

@Directive({
  selector: '[email]',
})
export class EmailDirective {
  @Input('email')
  public options: any = {};

  @HostBinding('errColor')
  public errColor: string = '#f00';

  private emailRegex = new RegExp(
    /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
  );

  constructor() {}

  public ngOnInit(): void {
    this.options = Object.assign({}, DEFAULT_OPTIONS, this.options);
    this.errColor = this.options.errColor;
  }

  @HostListener('blur', ['$event']) public onBlur($event: any): void {
    $event.stopPropagation();

    const el = $event.target;
    const value = el.value;

    el.style.borderColor = this.isValidEmail(value) ? 'initial' : this.errColor;
  }

  private isValidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
}
