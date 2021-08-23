import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit {
  userlistdata = [];
  constructor() {
    var data = window.localStorage.getItem("userdata")
    if (data) {
      this.userlistdata = JSON.parse(data);
    }
  }
  ngOnInit() {
  }
}
