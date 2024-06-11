import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private validUsername = 'nilvan'
  private validPassword = '321'
  constructor() { }
  login(username:string,password:string):
    boolean{
      return username === this.validUsername && password === this.validPassword;
    }
}
