import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService, User } from './auth.service';
import { UserFactory } from '../testing/factories';


describe('AuthService', () => {
  let authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      // All module imports go here.
      imports: [ HttpClientTestingModule ],
      // All components are declared here.
      declarations: [],
      // All services are referenced here.
      providers: [ AuthService ]
    });
    authService = TestBed.get(AuthService);
  });
  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});

describe('Authentication using a service', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService ]
    });
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should allow a user to sign up for a new account', () => {
    // Set up the data
    const userData = UserFactory.create();
    const photo: File = new File(['photo'], userData.photo, {type: 'image/jpeg'});

    // Execute function under test
    authService.signUp(
      userData.username,
      userData.first_name,
      userData.last_name,
      'pAssw0rd!',
      userData.email,
      userData.venmo_id,
      userData.group,
      photo
    ).subscribe(user => {
      expect(user).toBe(userData);
    });
  
    const request = httpMock.expectOne('/api/sign_up/');
      request.flush(userData);
  });

  it('should allow a user to log in to an existing account', () => {
    // Set up the data.
    const userData = UserFactory.create();
    // A successful login should write data to local storage.
    localStorage.clear();
    // Execute the function under test.
    authService.logIn(
      userData.username, 'pAssw0rd!'
    ).subscribe(user => {
      expect(user).toBe(userData);
    });
    const request = httpMock.expectOne('/api/log_in/');
    request.flush(userData);
    // Confirm that the expected data was written to local storage.
    expect(localStorage.getItem('taxi.user')).toBe(JSON.stringify(userData));
  });

  it('should allow a user to log out', () => {
    // Set up the data.
    const userData = UserFactory.create();
    // A successful logout should delete data on local storage.
    localStorage.setItem('taxi.user', JSON.stringify({}));
    // Execute the function under test.
    authService.logOut().subscribe(user => {
      expect(user).toBe(userData);
    });
    const request = httpMock.expectOne('/api/log_out/');
    request.flush(userData);
    // Confirm that the local storage data was deleted.
    expect(localStorage.getItem('taxi.user')).toBeNull();
  });

  it('should determine whether a user is logged in', () => {
    const userData = UserFactory.create();
    localStorage.clear();
    // User should not exist in the local storage
    expect(User.getUser()).toBeFalsy();
    // Now log this userData in
    localStorage.setItem('taxi.user', JSON.stringify({userData}));
    // So expect it to be successful
    expect(User.getUser()).toBeTruthy();
  });
});

