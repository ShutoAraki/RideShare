import { Component, Input } from '@angular/core';
import { Trip } from '../../services/trip.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() title: string;
  @Input() trips: Trip[];
  constructor() {
    // Driver feed suggestion
    // this.trips.sort((trip1: Trip, trip2: Trip) => {
    //   return trip1.price - trip2.price;
    // });
  }
}