import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function email(AC: AbstractControl): ValidationErrors | null {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return AC.value && !regex.test(AC.value) ? { email: true } : null;
}

export function matchPassword(AC: AbstractControl): ValidationErrors | null {
  const password = AC.get('password')?.value;
  const confirmPassword = AC.get('confirmPassword')?.value;
  if (password && confirmPassword) {
    AC.get('confirmPassword')?.setErrors(
      password !== confirmPassword ? { matchPassword: true } : null
    );
  }
  return null;
}

export function noWhitespace(AC: AbstractControl): ValidationErrors | null {
  if (AC.value && AC.value.match(/\s+/g)) {
    return { whiteSpace: true };
  }

  return null;
}

export const combinedLengthValidator =
  (maxLength: number, fields: string[]) =>
  (control: AbstractControl): ValidationErrors | null => {
    const length = getCombinedLength(control, fields);
    if (length > maxLength) {
      return { combinedLength: { maxLength } };
    }
    return null;
  };

export const getCombinedLength = (control: AbstractControl, fields: string[]) =>
  fields
    .map((f) => control.get(f)?.value?.length || 0)
    .reduce((a, b) => a + b, 0);

export function numbers(AC: AbstractControl) {
  return AC.value && !/^[0-9]*$/.test(AC.value) ? { numbers: true } : null;
}
