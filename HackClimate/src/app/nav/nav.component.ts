import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user!:User
  userFullName!:string
  userAdress!:string
  temp:string = '2.0°C'
  constructor(private userService: UserService){}

  ngOnInit(): void {
      this.user = this.userService.loggedUser
      this.userAdress = this.userService.getUserAdress()
      this.userFullName = this.userService.getUserFullName()
  }

}
