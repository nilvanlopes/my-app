import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private validUsername = 'pyu'
  private validPassword = 'pyu'
  constructor() { }
  login(username:string,password:string):
    boolean{
      return username === this.validUsername && password === this.validPassword;
    }
}
