import {
  IUpdateUserDTO,
  ICreateUserDTO,
  IUserDTO,
} from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '../IUsersRepository';

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    full_name,
    birth_date,
    city_residence,
    email,
    password,
    type_schooling_id,
    type_user_id,
    uf_residence,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuidV4(),
      full_name,
      birth_date,
      city_residence,
      email,
      password,
      type_schooling_id,
      type_user_id,
      uf_residence,
    });

    this.users.push(user);

    return user;
  }

  async findByEmail({ email }: IUserDTO): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async findById({ id }: IUserDTO): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async update({
    id,
    full_name,
    birth_date,
    city_residence,
    email,
    password,
    type_schooling_id,
    uf_residence,
    active,
  }: IUpdateUserDTO): Promise<User> {
    const findIndex = this.users.findIndex(user => user.id === id);

    this.users[findIndex].full_name = full_name;
    this.users[findIndex].birth_date = birth_date;
    this.users[findIndex].city_residence = city_residence;
    this.users[findIndex].email = email;
    this.users[findIndex].password = password;
    this.users[findIndex].type_schooling_id = type_schooling_id;
    this.users[findIndex].uf_residence = uf_residence;
    this.users[findIndex].active = active;

    return this.users[findIndex];
  }

  async delete({ id, active }: IUpdateUserDTO): Promise<User> {
    const findIndex = this.users.findIndex(user => user.id === id);

    this.users[findIndex].active = active;

    return this.users[findIndex];
  }

  async list(): Promise<User[]> {
    const all = this.users;

    return all;
  }
}

export { UserRepositoryInMemory };
