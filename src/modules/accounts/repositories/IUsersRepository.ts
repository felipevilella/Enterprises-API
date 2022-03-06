import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUserDTO, ICreateUserDTO, IUpdateUserDTO } from '../dtos/IUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail({ email }: IUserDTO): Promise<User>;
  findById({ id }: IUserDTO): Promise<User>;
  list(): Promise<User[]>;
  update(data: IUpdateUserDTO): Promise<User>;
  delete({ active }: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository };
