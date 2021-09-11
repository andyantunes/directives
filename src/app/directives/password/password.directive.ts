import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { PasswordOptions } from './password.model';

const DEFAULT_OPTIONS: PasswordOptions = {
  minLength: 8,
  pattern: '',
  errColor: '',
};

@Directive({
  selector: '[password]',
})
export class PasswordDirective {
  @Input('password')
  public options: PasswordOptions = {};

  @HostBinding('minLength')
  public minLength: number = 8;

  @HostBinding('pattern')
  public pattern: string = '';

  @HostBinding('errColor')
  public errColor: string = '#f00';

  constructor() {}

  ngOnInit(): void {
    this.options = Object.assign({}, DEFAULT_OPTIONS, this.options);
    this.minLength = this.options.minLength ?? 8;
    this.pattern = this.options.pattern ?? '';
    this.errColor = this.options.errColor ?? '#f00';
  }

  @HostListener('blur', ['$event']) public onBlur($event: any): void {
    $event.stopPropagation();

    const el = $event.target;
    const value = el.value;

    this.passwordValidation(el, value);
  }

  private passwordValidation(el: any, password: string): void {
    console.log(this.isMinLengthValid(password), this.isPatternValid(password));
    if (this.isMinLengthValid(password) && this.isPatternValid(password)) {
      el.style.borderColor = 'initial';
    } else {
      el.style.borderColor = this.errColor;
    }
  }

  private isMinLengthValid(password: string): boolean {
    return password.length >= this.minLength ? true : false;
  }

  private isPatternValid(password: string): boolean {
    let isValid: boolean = true;
    if (this.pattern !== '') {
      const regex = new RegExp(this.pattern);
      isValid = regex.test(password) ? true : false;
    }
    return isValid;
  }
}
