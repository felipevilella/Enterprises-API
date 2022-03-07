import { IDetailtUser } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { UserMap } from '@modules/accounts/mapper/UserMap';

@injectable()
class DetailsUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id_action, id }: IDetailtUser): Promise<User> {
    const userAction = await this.usersRepository.findById({
      id: user_id_action,
    });

    if (
      userAction.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2' &&
      id !== userAction.id
    ) {
      throw new AppError(
        'This user does not have permission to perform a profile list',
        401,
      );
    }

    const user = await this.usersRepository.findById({
      id,
    });

    return UserMap.toDTO(user);
  }
}

export { DetailsUserUseCase };
