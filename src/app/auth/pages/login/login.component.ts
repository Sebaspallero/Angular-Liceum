import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, loginFormValue } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  emailControl = new FormControl(
    'sebastian@email.com',
    [
      Validators.required,
      Validators.email
    ]
  );

  passwordControl = new FormControl(
    '12345',
    [
      Validators.required,
      Validators.minLength(3),
    ]
  );

  loginForm = new FormGroup(
    {
      email: this.emailControl,
      password: this.passwordControl
    }
  )

  constructor(
    private authService: AuthService
  ){}

  onLogin():void {
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value as loginFormValue)
    }
    else{
      console.log('invalid')
      this.loginForm.markAllAsTouched();
  
    }
  }

}
