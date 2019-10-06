import * as faker from 'faker';

import { User } from '../services/auth.service';
import { Trip } from '../services/trip.service';

export class UserFactory {
  static create(data?: object): User {
    return User.create(Object.assign({
      id: faker.random.number(),
      username: faker.internet.userName(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      group: 'rider',
      venmo_id: faker.finance.accountName(),
      photo: faker.image.imageUrl()
    }, data));
  }
}

export class TripFactory {
  static create(data?: object): Trip {
    return Trip.create(Object.assign({
      id: faker.random.uuid(),
      created: faker.date.past(),
      updated: faker.date.past(),
      pick_up_address: faker.address.streetAddress(),
      drop_off_address: faker.address.streetAddress(),
      status: 'REQUESTED',
      driver: UserFactory.create({group: 'driver'}),
      rider: UserFactory.create()
    }, data));
  }
}