import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) {
    return null;
  }

  const hasNumber = /\d/.test(control.value);
  const hasUpper = /[A-Z]/.test(control.value);
  const hasLower = /[a-z]/.test(control.value);
  const noWhiteSpace = /\s/.test(control.value);
  const hasLength = control.value.length >= 8 && control.value.length < 20;
  const valid = hasNumber && hasUpper && hasLower && hasLength && !noWhiteSpace;

  if (!valid) {
    return {
      notNumber: !hasNumber,
      notUpper: !hasUpper,
      notLower: !hasLower,
      notLength: !hasLength,
      hasWhiteSpace: noWhiteSpace
    };
  }
  return null;
};
