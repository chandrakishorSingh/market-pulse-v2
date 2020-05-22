import {AbstractControl, ValidationErrors} from '@angular/forms';

export const passwordValidator = (control: AbstractControl): ValidationErrors => {
  const value = control.value as string;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value) && /[^a-zA-Z0-9]/.test(value) && /[0-9]/.test(value) && value.length > 8) {
    return null;
  }
  return {
    message: 'Password should be greater than 8 characters and must contain one uppercase, one lowercase, one special character.'
  };
};
