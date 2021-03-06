import { HttpClientTestingModule } from '@angular/common/http/testing'; // new
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRoute, Data } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable, of } from 'rxjs';

import { TripService } from '../../services/trip.service'; // new
import { TripFactory } from '../../testing/factories';
import { DriverDetailComponent } from './driver-detail.component';

describe('DriverDetailComponent', () => {
  let component: DriverDetailComponent;
  let fixture: ComponentFixture<DriverDetailComponent>;
  let tripService: TripService; // new
  const trip = TripFactory.create();

  class MockActivatedRoute {
    data: Observable<Data> = of({
      trip
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // new
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ DriverDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(DriverDetailComponent);
    component = fixture.componentInstance;
    tripService = TestBed.get(TripService); // new
  });

  it('should update data on initialization', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.trip).toEqual(trip);
    });
    component.ngOnInit();
  }));

  it('should update trip status', () => { // new
    const spyUpdateTrip = spyOn(tripService, 'updateTrip');
    component.trip = TripFactory.create();
    component.updateTripStatus('STARTED');
    expect(spyUpdateTrip).toHaveBeenCalledWith(component.trip);
  });
});