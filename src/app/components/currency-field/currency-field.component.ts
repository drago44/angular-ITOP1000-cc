import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-currency-field',
  templateUrl: './currency-field.component.html',
  styleUrls: ['./currency-field.component.scss'],
})
export class AppCurrencyField {
  @Input() currencies: Currency[];
  @Input() value: number;
  @Input() code: string;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() codeChange: EventEmitter<string> = new EventEmitter<string>();

  onChange(): void {
    this.valueChange.emit(this.value);
    this.codeChange.emit(this.code);
  }
}
