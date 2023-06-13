import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { Currency } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  @Input() currencies: Currency[];
  public currency = new FormControl('');
  private unsubscribe$: Subject<void> = new Subject<void>();

  private onChange: Function;
  private onTouched: Function;

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public writeValue(value: any): void {
    this.currency.setValue(value);
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    this.currency.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        map(String),
        tap((value) => this.onChange(value))
      )
      .subscribe();
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
