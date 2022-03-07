import { IUpdateUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id_action, id, active }: IUpdateUserDTO): Promise<User> {
    const userEdit = await this.usersRepository.findById({
      id: user_id_action,
    });

    if (userEdit.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2') {
      throw new AppError(
        'This user does not have permission to perform a profile delete',
        401,
      );
    }

    const user = await this.usersRepository.delete({
      id,
      active,
    });

    return user;
  }
}

export { DeleteUserUseCase };
