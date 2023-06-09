import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Currency {
  rate: number;
  full_name: string;
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
})
export class AppCurrencyInput {
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
