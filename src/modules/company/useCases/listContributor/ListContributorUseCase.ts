import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IListCollaboratorDTO } from '@modules/company/dtos/ICollaboratorDTO';
import { Collaborator } from '@modules/company/infra/typeorm/entities/Collaborator';
import { ICollaboratorRepository } from '@modules/company/repositories/ICollaboratorRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListContributorUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}
  async execute({
    company_id,
    user_id_action,
  }: IListCollaboratorDTO): Promise<Collaborator[]> {
    const userAction = await this.usersRepository.findById({
      id: user_id_action,
    });

    const userActionCollaborator = await this.collaboratorRepository.findByUser(
      { user_id: user_id_action },
    );

    if (userActionCollaborator) {
      if (
        userActionCollaborator.type_office_id ===
          'e60c3074-441a-4ced-b246-9815b10c07c7' &&
        userAction.type_user_id === 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5'
      ) {
        throw new AppError(
          'This employee does not have permission to perform a list contributor0',
          400,
        );
      }

      if (userActionCollaborator.company_id !== company_id) {
        throw new AppError(
          'This user does not have permission to perform a list contributor',
          400,
        );
      }
    }

    const collaborators = await this.collaboratorRepository.list({
      company_id,
    });

    collaborators.forEach(
      collaborator => (collaborator.user = UserMap.toDTO(collaborator.user)),
    );

    return collaborators;
  }
}

export { ListContributorUseCase };
