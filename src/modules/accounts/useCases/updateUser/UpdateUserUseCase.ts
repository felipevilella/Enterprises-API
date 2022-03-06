import { IUpdateUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_id_action,
    id,
    full_name,
    birth_date,
    city_residence,
    email,
    password,
    type_schooling_id,
    uf_residence,
  }: IUpdateUserDTO): Promise<User> {
    const userEdit = await this.usersRepository.findById({
      id: user_id_action,
    });
    const userUpdate = await this.usersRepository.findById({ id });

    if (
      userEdit.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2' &&
      user_id_action !== id
    ) {
      throw new AppError(
        'This user does not have permission to perform a profile update',
        401,
      );
    }

    const user = await this.usersRepository.update({
      id,
      full_name: full_name || userUpdate.full_name,
      city_residence: city_residence || userUpdate.city_residence,
      birth_date: birth_date || userUpdate.birth_date,
      email: email || userUpdate.email,
      password: password || userUpdate.password,
      type_schooling_id: type_schooling_id || userUpdate.type_schooling_id,
      uf_residence: uf_residence || userUpdate.uf_residence,
    });

    return user;
  }
}

export { UpdateUserUseCase };
