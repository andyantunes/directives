import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { throwError } from 'rxjs';

const DEFAULT_OPTIONS = {
  cellphone: false,
  landline: false,
};

@Directive({
  selector: '[phone]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneDirective,
      multi: true,
    },
  ],
})
export class PhoneDirective implements ControlValueAccessor, OnInit {
  @Input('phone')
  public options: any = {};

  @HostBinding('cellphone')
  public cellphone: boolean = false;

  @HostBinding('landline')
  public landline: boolean = false;

  private onTouched: any;
  private onChange: any;

  private phoneRegex = /^([\d]{2})\ ?([\d]{4})\-?([\d]{4})/;
  phone: string = '';

  private mask = '';
  private len = 0;

  constructor(private el: ElementRef) {}

  public ngOnInit(): void {
    this.options = Object.assign({}, DEFAULT_OPTIONS, this.options);
    this.cellphone = this.options.cellphone;
    this.landline = this.options.landline;
  }

  @HostListener('keyup', ['$event']) public onKeyUp($event: any): void {
    $event.stopPropagation();
    const value = $event.target.value;
    let a = this.checkMaskType(value);

    let b = this.formatInput(a, this.mask, this.len);
    this.writeValue(b);
  }

  /**
   * Check the type of phone mask, cellphone or landline
   * @author Anderson Antunes <andersonlantunes@gmail.com>
   *
   * @param {string} value
   * @returns
   */
  private checkMaskType(value: string): string {
    if (!this.isEmpty(value)) {
      if (this.cellphone) {
        return this.cellphoneMask(value);
      } else if (this.landline) {
        return this.landlineMask(value);
      } else {
        return this.generalMask(value);
      }
    }
    return '';
  }

  /**
   * Handle the input value to add mask when the input must be cellphone
   * @author Anderson Antunes <andersonlantunes@gmail.com>
   *
   * @param {string} value Value of input
   * @returns {string} Returns phone (cellphone) number with spaces to add mask
   */
  private cellphoneMask(value: string): string {
    this.mask = '(99) 99999-9999';
    this.len = 15;

    let inputValue = value;
    // Replace all characters to void
    inputValue = inputValue.replace(/\D/gi, '');
    // Add spaces between first and second 'group'
    inputValue = inputValue.replace(/(\d{2})(\d)/gi, '$1 $2');
    // Add dash on mask
    inputValue = inputValue.replace(/(\d{5})(\d)/gi, '$1-$2');
    // Join the last group
    inputValue = inputValue.replace(/(\d{4})(\d)/gi, '$1$2');

    return inputValue;
  }

  /**
   * Handle the input value to add mask when the input must be landline
   * @author Anderson Antunes <andersonlantunes@gmail.com>
   *
   * @param {string} value Value of input
   * @returns {string} Returns phone (landline) number with spaces to add mask
   */
  private landlineMask(value: string): string {
    this.mask = '(99) 9999-9999';
    this.len = 14;

    let inputValue = value;
    // Replace all characters to void
    inputValue = inputValue.replace(/\D/gi, '');
    // Add spaces between first and second 'group'
    inputValue = inputValue.replace(/(\d{2})(\d)/gi, '$1 $2');
    // Add dash on mask
    inputValue = inputValue.replace(/(\d{4})(\d)/gi, '$1-$2');
    // Join the last group
    inputValue = inputValue.replace(/(\d{4})(\d)/gi, '$1$2');

    return inputValue;
  }

  /**
   * Handle the input value to add mask when the input can be mobile or landline
   * @author Anderson Antunes <andersonlantunes@gmail.com>
   *
   * @param {string} value Value of input
   * @returns {string} Returns phone number with spaces to add mask
   */
  private generalMask(value: string): string {
    let inputValue = value;
    let length = 0;
    if (inputValue.length > 14 || inputValue.length === 11) {
      this.len = 15;
      this.mask = '(99) 99999-9999';
      length = 5;
      // inputValue = inputValue.replace(/\D/gi, '');
      // inputValue = inputValue.replace(/(\d{2})(\d)/gi, '$1 $2');
      // inputValue = inputValue.replace(/(\d{5})(\d)/gi, '$1-$2');
      // inputValue = inputValue.replace(/(\d{4})(\d)/gi, '$1$2');
    } else {
      this.len = 14;
      this.mask = '(99) 9999-9999';
      length = 4;
      // inputValue = inputValue.replace(/\D/gi, '');
      // inputValue = inputValue.replace(/(\d{2})(\d)/gi, '$1 $2');
      // inputValue = inputValue.replace(/(\d{4})(\d)/gi, '$1-$2');
      // inputValue = inputValue.replace(/(\d{4})(\d)/gi, '$1$2');
    }
    inputValue = inputValue.replace(/\D/gi, '');
    inputValue = inputValue.replace(/(\d{2})(\d)/gi, '$1 $2');
    inputValue = inputValue.replace(`/(\d${length})(\d)/gi`, '$1-$2');
    inputValue = inputValue.replace(/(\d{4})(\d)/gi, '$1$2');
    return inputValue;
  }

  private formatInput(inputValue: string, mask: string, size: number): any {
    try {
      if (!size) throwError(new Error('Sem size!'));
      let booleanMask;
      const regex = /\_|\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%|\:| /gi;
      const inputCleared = inputValue.toString().replace(regex, '');
      let fieldPosition = 0;
      let newFieldValue = '';
      let maskLength = inputCleared.length;

      for (let i = 0; i < maskLength; i++) {
        if (i < size) {
          booleanMask = mask.charAt(i) === '-' || mask.charAt(i) === '.' || mask.charAt(i) === '/';
          booleanMask = booleanMask || mask.charAt(i) === '_';
          booleanMask = booleanMask || mask.charAt(i) === '(' || mask.charAt(i) === ')' || mask.charAt(i) === ' ';
          booleanMask = booleanMask || mask.charAt(i) === ',' || mask.charAt(i) === '*' || mask.charAt(i) === '+';
          booleanMask = booleanMask || mask.charAt(i) === '@' || mask.charAt(i) === '#' || mask.charAt(i) === ':';
          booleanMask = booleanMask || mask.charAt(i) === '$' || mask.charAt(i) === '&' || mask.charAt(i) === '%';
          if (booleanMask) {
            newFieldValue += mask.charAt(i);
            maskLength++;
          } else {
            newFieldValue += inputCleared.charAt(fieldPosition);
            fieldPosition++;
          }
        }
      }
      return newFieldValue;
    } catch (error) {
      alert(error);
    }
  }

  /**
   * Check if the input value is empty
   *
   * @author Anderson Antunes <andersonlantunes@gmail.com>
   * @example <caption>Example usage of method.</caption>
   * // Returns true
   * this.isEmpty('');
   * @param {string} value Value of input
   * @returns {boolean} Returns true if is empty
   */
  private isEmpty(value: string): boolean {
    if (value === '' || value === null || value === undefined) {
      return true;
    }
    return false;
  }

  /**
   * Registra a função a ser chamada para atualizar o valor na model.
   *
   * @param fn any
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra a função a ser chamada para atualizar o valor na model
   * para o evento touched.
   *
   * @param fn any
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Obtém o valor contido na model.
   *
   * @param value any
   */
  writeValue(value: string): void {
    this.el.nativeElement.value = value;
  }
}
