import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:FormGroup;
  errorMessage: string | null = null;
  constructor(
    private fb : FormBuilder,
    private authService:AuthService,
    private router:Router){
      this.loginForm = this.fb.group({
        login : ['',Validators.required],
        senha : ['',Validators.required]
      })
  }
onSubmit(){
  if(this.loginForm.valid){
    const {login,senha} = this.loginForm.value;
    console.log(this.loginForm.value);
    if(this.authService.login(login,senha)){
      console.log('Login efetuado com sucesso');
      this.errorMessage = null;
      this.router.navigate(['/crud']);
    }else{
      this.errorMessage = 'Login ou senha inválidos'
      console.log(this.errorMessage);

    }
  }
}
}
