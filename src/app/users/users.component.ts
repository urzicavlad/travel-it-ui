import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../api/user-data.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private users: User[] = [];

  constructor(private userDataService: UserDataService) {
  }

  ngOnInit() {
    this.userDataService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

}
