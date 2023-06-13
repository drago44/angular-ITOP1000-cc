import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnDestroy {
  public currency = new FormControl(0.0);
  private unsubscribe$: Subject<void> = new Subject<void>();

  private onChange!: (value: number) => void;
  private onTouched!: () => void;

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public writeValue(value: number): void {
    this.currency.setValue(value);
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
    this.currency.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        map(Number),
        tap((value) => this.onChange(value))
      )
      .subscribe();
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
