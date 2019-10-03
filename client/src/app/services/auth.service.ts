import { Injectable } from '@angular/core';

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
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
}
