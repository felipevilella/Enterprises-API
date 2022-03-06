import { IListUsers } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
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

    if (
      userAction.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2' &&
      id !== userAction.id
    ) {
      throw new AppError(
        'This user does not have permission to perform a profile list',
        401,
      );
    }

    const user = await this.usersRepository.list();

    return user;
  }
}

export { ListUsersUseCase };
