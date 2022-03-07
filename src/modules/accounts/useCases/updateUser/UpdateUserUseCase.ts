import { IUpdateUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICollaboratorRepository } from '@modules/company/repositories/ICollaboratorRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { UserMap } from '@modules/accounts/mapper/UserMap';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
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

    const userActionCollaborator = await this.collaboratorRepository.findByUser(
      { user_id: user_id_action },
    );

    const userEditCollaborator = await this.collaboratorRepository.findByUser({
      user_id: id,
    });

    if (userActionCollaborator && userEditCollaborator) {
      if (
        userActionCollaborator.type_office_id ===
          'e60c3074-441a-4ced-b246-9815b10c07c7' ||
        userActionCollaborator.company_id !== userEditCollaborator.company_id
      ) {
        throw new AppError(
          'This employee does not have permission to perform a list contributor0',
          400,
        );
      }
    } else if (
      userEdit.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2' &&
      user_id_action !== userUpdate.id
    ) {
      throw new AppError(
        'This user does not have permission to perform a profile update',
        400,
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

    return UserMap.toDTO(user);
  }
}

export { UpdateUserUseCase };
