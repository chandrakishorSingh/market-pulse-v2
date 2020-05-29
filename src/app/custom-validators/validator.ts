import {AbstractControl, ValidationErrors} from '@angular/forms';

export const validator = (control: AbstractControl): ValidationErrors => {
  const value = control.value as string;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value) && /[^a-zA-Z0-9]/.test(value) && /[0-9]/.test(value) && value.length > 8) {
    return null;
  }
  return {
    message: 'Password should be greater than 8 characters and must contain one uppercase, one lowercase, one special character.'
  };
};

export const otpValidator = (control: AbstractControl): ValidationErrors => {
  const value = '' + control.value;
  return /^[0-9]{6}$/.test(value) ? null : { message: 'OTP should be a 6 digit number.' };
};

export const phoneNumberValidator = (control: AbstractControl): ValidationErrors => {
  const value = '' + control.value;
  if (/^[0-9]{10}$/.test(value)) {
    return null;
  } else {
    return {
      message: 'Phone Number should be a 10 digit number.'
    };
  }
};

export const integerValidator = (control: AbstractControl): ValidationErrors => {
  return Number.isInteger(control.value) && control.value > 0 ? null : { message: 'Quantity should be a positive integer.' };
};




