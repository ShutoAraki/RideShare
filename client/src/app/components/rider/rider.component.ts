import { Component, OnInit } from '@angular/core';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-rider',
  templateUrl: './rider.component.html',
  styleUrls: ['./rider.component.css']
})
export class RiderComponent implements OnInit {

  constructor() {}
  
  getUser(): User {
    return User.getUser();
  }

  ngOnInit() {
  }

}
