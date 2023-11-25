import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedUser: User = new User('Mariusz', 'Marucha','00, 4007 HafrsFjord')

  constructor() { }


  getUserAdress(){
    return this.loggedUser.adress
  }
  getUserFullName(){
    return this.loggedUser.name + ' ' + this.loggedUser.lastName
  }



}
