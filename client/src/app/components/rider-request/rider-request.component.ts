import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../services/auth.service';
import { Trip, TripService } from '../../services/trip.service';

class Marker {
  constructor(
    public lat: number,
    public lng: number,
    public label?: string
  ) {}
}

@Component({
  selector: 'app-rider-request',
  templateUrl: './rider-request.component.html',
  styleUrls: ['./rider-request.component.css']
})
export class RiderRequestComponent implements OnInit {
  trip: Trip = new Trip();
  lat = 0;
  lng = 0;
  zoom = 13;
  markers: Marker[];

  constructor(
    private router: Router,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log("Current location!")
        console.log(this.lat)
        console.log(this.lng)
        this.markers = [
          new Marker(this.lat, this.lng, "You Are Here!")
        ];
      });
    }
  }

  onSubmit(): void {
    this.trip.rider = User.getUser();
    this.tripService.createTrip(this.trip);
    this.router.navigateByUrl('/rider');
  }
}