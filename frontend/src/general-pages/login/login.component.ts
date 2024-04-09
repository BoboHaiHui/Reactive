import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email, Validators.max(30)]),
      password: new FormControl(null, [Validators.required, Validators.max(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,20}')])
    })
  }

  onSubmit(){
    const loginData = {
      email: this.reactiveForm.value.email,
      password: this.reactiveForm.value.password
    };
    console.log(loginData)
  }
}
