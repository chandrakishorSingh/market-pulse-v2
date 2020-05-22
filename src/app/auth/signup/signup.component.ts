import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../custom-validators/password.validator";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor() {
    this.initializeForm();
  }

  ngOnInit() {}

  initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl(null, passwordValidator),
    });
  }

  onSubmit() {
    console.log(this.form);
  }

}
