import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[cep]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CepDirective,
      multi: true,
    },
  ],
})
export class CepDirective implements ControlValueAccessor {
  private onTouched: any;
  private onChange: any;

  private cepRegex = /^([\d]{5})\-?([\d]{3})/;

  constructor(private el: ElementRef) {}

  /**
   * Implements the keyup event to the directive element and format cep value - Ex.: (5-3)
   *
   * @param $event any
   */
  @HostListener('input', ['$event']) onInput($event: any) {
    const value = $event.target.value;
    const formatted = value.replace(this.cepRegex, '$1-$2');
    const cepFormatted = formatted.substring(0, 9);

    $event.target.value = cepFormatted;
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
    console.log(value);
    this.el.nativeElement.value = value;
  }
}
