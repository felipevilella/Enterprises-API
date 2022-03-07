import { ICreateUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({
    full_name,
    birth_date,
    city_residence,
    email,
    password,
    type_schooling_id,
    type_user_id,
    uf_residence,
  }: ICreateUserDTO): Promise<User> {
    const passwordHash = await hash(password, 8);
    const userAlreadyExisty = await this.usersRepository.findByEmail({ email });

    if (userAlreadyExisty) {
      throw new AppError('User Already exists', 401);
    }

    const user = await this.usersRepository.create({
      full_name,
      birth_date,
      city_residence,
      email,
      password: passwordHash,
      type_schooling_id,
      type_user_id,
      uf_residence,
      active: true,
    });

    return UserMap.toDTO(user);
  }
}

export { CreateUserUseCase };
