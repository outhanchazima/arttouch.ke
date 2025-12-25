import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-input',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-3 justify-center">
      @for (digit of digits(); track $index) {
        <input
          #otpInput
          type="text"
          inputmode="numeric"
          maxlength="1"
          [value]="digit"
          (input)="onInput($event, $index)"
          (keydown)="onKeyDown($event, $index)"
          (paste)="onPaste($event)"
          (focus)="onFocus($index)"
          class="w-12 h-14 text-center text-xl font-bold border border-gray-300 bg-white focus:border-[#111] focus:ring-0 outline-none transition-all"
          [class.border-red-500]="hasError()"
        />
      }
    </div>
  `,
  host: {
    class: 'block',
  },
})
export class OtpInputComponent {
  @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

  value = model<string>('');
  hasError = model<boolean>(false);

  digits = signal<string[]>(['', '', '', '', '', '']);

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Only digits

    if (value.length > 0) {
      // Update the digit at this index
      this.updateDigit(index, value[0]);

      // Move to next input
      if (index < 5) {
        this.focusInput(index + 1);
      }
    } else {
      this.updateDigit(index, '');
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      if (input.value === '' && index > 0) {
        // Move to previous input and clear it
        this.focusInput(index - 1);
        this.updateDigit(index - 1, '');
        event.preventDefault();
      } else {
        // Clear current input
        this.updateDigit(index, '');
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      this.focusInput(index - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowRight' && index < 5) {
      this.focusInput(index + 1);
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') ?? '';
    const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');

    // Fill in the digits
    const newDigits = [...this.digits()];
    digits.forEach((digit, i) => {
      if (i < 6) {
        newDigits[i] = digit;
      }
    });
    this.digits.set(newDigits);
    this.updateValue();

    // Focus the next empty input or the last one
    const nextEmptyIndex = newDigits.findIndex((d) => d === '');
    this.focusInput(nextEmptyIndex === -1 ? 5 : nextEmptyIndex);
  }

  onFocus(index: number): void {
    // Select the content when focusing
    const inputArray = this.inputs.toArray();
    if (inputArray[index]) {
      inputArray[index].nativeElement.select();
    }
  }

  private updateDigit(index: number, value: string): void {
    const newDigits = [...this.digits()];
    newDigits[index] = value;
    this.digits.set(newDigits);
    this.updateValue();
  }

  private updateValue(): void {
    this.value.set(this.digits().join(''));
  }

  private focusInput(index: number): void {
    setTimeout(() => {
      const inputArray = this.inputs.toArray();
      if (inputArray[index]) {
        inputArray[index].nativeElement.focus();
      }
    }, 0);
  }

  /** Focus the first input - can be called from parent */
  focus(): void {
    this.focusInput(0);
  }

  /** Clear all inputs - can be called from parent */
  clear(): void {
    this.digits.set(['', '', '', '', '', '']);
    this.updateValue();
    this.focusInput(0);
  }
}
