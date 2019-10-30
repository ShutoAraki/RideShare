import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public first_name?: string,
    public last_name?: string,
    public email?: string,
    public group?: string,
    public venmo_id?: string,
    public photo?: any
  ) {}

  static create(data: any): User {
    return new User(
      data.id,
      data.username,
      data.first_name,
      data.last_name,
      data.email,
      data.group,
      data.venmo_id,
      data.photo
    )
  }

  static getUser(): User {
    const userData = localStorage.getItem('taxi.user');
    if (userData) {
      return this.create(JSON.parse(userData));
    }
    return null;
  }

  static isRider(): boolean {
    const user = User.getUser();
    if (user === null) {
      return false;
    }
    return user.group === 'rider';
  }

  static isDriver(): boolean {
    const user = User.getUser();
    if (user === null) {
      return false;
    }
    return user.group === 'driver';
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    group: string,
    venmo_id: string,
    photo: any
  ): Observable<User> {
    const url = '/api/sign_up/';
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password1', password);
    formData.append('password2', password);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('group', group);
    formData.append('email', email);
    formData.append('venmo_id', venmo_id);
    formData.append('photo', photo);
    console.log("Trying to sign up!")
    console.log(formData.get('username'))
    console.log(formData.get('password1'))
    console.log(formData.get('first_name'))
    console.log(formData.get('last_name'))
    console.log(formData.get('group'))
    console.log(formData.get('email'))
    console.log(formData.get('venmo_id'))
    return this.http.request<User>('POST', url, {body: formData});
  }

  logIn(
    username: string,
    password: string
  ): Observable<User> {
    const url = '/api/log_in/';
    return this.http.post<User>(url, {username, password}).pipe(
      tap(user => localStorage.setItem('taxi.user', JSON.stringify(user)))
    );
  }

  logOut(): Observable<any> {
    const url = '/api/log_out/';
    return this.http.post(url, null).pipe(
      finalize(() => localStorage.removeItem('taxi.user'))
    );
  }
}
