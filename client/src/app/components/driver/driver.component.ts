import { Component } from '@angular/core';
import { User } from '../../services/auth.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent {
  getUser(): User {
    return User.getUser();
  }
}