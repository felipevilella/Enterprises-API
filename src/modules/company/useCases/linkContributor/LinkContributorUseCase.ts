import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateCollaboratorDTO } from '@modules/company/dtos/ICollaboratorDTO';
import { Collaborator } from '@modules/company/infra/typeorm/entities/Collaborator';
import { ICollaboratorRepository } from '@modules/company/repositories/ICollaboratorRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class LinkContributorUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}
  async execute({
    company_id,
    type_office_id,
    user_id,
    user_id_action,
  }: ICreateCollaboratorDTO): Promise<Collaborator> {
    const userAction = await this.usersRepository.findById({
      id: user_id_action,
    });

    const userLinked = await this.usersRepository.findById({ id: user_id });
    const userActionCollaborator = await this.collaboratorRepository.findByUser(
      { user_id: user_id_action },
    );

    if (userActionCollaborator) {
      if (
        userActionCollaborator.type_office_id ===
        'e60c3074-441a-4ced-b246-9815b10c07c7'
      ) {
        throw new AppError(
          'This employee does not have permission to perform a link contributor',
          400,
        );
      }

      if (
        type_office_id !== 'e60c3074-441a-4ced-b246-9815b10c07c7' &&
        userLinked.type_user_id === 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2'
      ) {
        throw new AppError(
          'This user does not have permission to perform a link contributora',
          400,
        );
      }
    } else if (
      (userAction.type_user_id === 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2' &&
        userLinked.type_user_id === 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2') ||
      userAction.type_user_id === 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5'
    ) {
      throw new AppError(
        'This user does not have permission to perform a link contributor',
        400,
      );
    }

    const collaborator = await this.collaboratorRepository.create({
      company_id,
      type_office_id,
      user_id,
    });

    return collaborator;
  }
}

export { LinkContributorUseCase };
