import { Component, OnInit } from '@angular/core';
import { Login } from '../login/login.model';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Login [] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
      });
  }
}
