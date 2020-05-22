import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../custom-validators/password.validator";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  form: FormGroup;

  constructor() {
    this.initializeForm();
  }

  ngOnInit() {
  }

  initializeForm() {
    this.form = new FormGroup({
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl(null, passwordValidator),
    });
  }

  onSubmit() {
    console.log(this.form);
  }

}
