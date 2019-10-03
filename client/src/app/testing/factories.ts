import * as faker from 'faker';

import { User } from '../services/auth.service';

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