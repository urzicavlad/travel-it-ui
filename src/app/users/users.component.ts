import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userDataService: UserService) {
  }

  ngOnInit() {
    this.userDataService.getAll().subscribe(users => {
      this.users = users;
    });
  }

}
