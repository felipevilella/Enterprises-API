import { IListUsers } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IListUsers): Promise<User[]> {
    const userAction = await this.usersRepository.findById({
      id,
    });

    if (userAction.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2') {
      throw new AppError(
        'This user does not have permission to perform a profile list',
        401,
      );
    }

    const users = await this.usersRepository.list();
    const usersList = [];

    users.forEach(user => usersList.push(UserMap.toDTO(user)));

    return usersList;
  }
}

export { ListUsersUseCase };
