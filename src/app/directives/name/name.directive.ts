import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { NameOptions } from './name.model';

const DEFAULT_OPTIONS: NameOptions = {
  name: false,
  nameMinLength: 3,
  fullName: false,
  errColor: '',
};

@Directive({
  selector: '[name]',
})
export class NameDirective {
  @Input('name')
  public options: NameOptions = {};

  @HostBinding('name')
  public name: boolean = false;

  @HostBinding('nameMinLength')
  public nameMinLength: number = 3;

  @HostBinding('fullName')
  public fullName: boolean = false;

  @HostBinding('errColor')
  public errColor: string = '#f00';

  private regexFullName = new RegExp(/^[A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-zÀ-ÿ']+$/);

  constructor() {}

  public ngOnInit(): void {
    this.options = Object.assign({}, DEFAULT_OPTIONS, this.options);
    this.name = this.options.name ?? false;
    this.nameMinLength = this.options.nameMinLength ?? 3;
    this.fullName = this.options.fullName ?? false;
    this.errColor = this.options.errColor ?? '#f00';
  }

  @HostListener('blur', ['$event']) public onBlur($event: any): void {
    $event.stopPropagation();

    const el = $event.target;
    const value = el.value;

    this.name && this.nameValidate(el, value);
    this.fullName && this.fullNameValidate(el, value);
  }

  private nameValidate(el: any, name: string): void {
    el.style.borderColor = this.isValidName(name) ? 'initial' : this.errColor;
  }

  private isValidName(name: string): boolean {
    return name.length >= this.nameMinLength ? true : false;
  }

  private fullNameValidate(el: any, name: string): void {
    el.style.borderColor = this.isValidFullName(name) ? 'initial' : this.errColor;
  }

  private isValidFullName(name: string): boolean {
    return this.regexFullName.test(name) ? true : false;
  }
}
