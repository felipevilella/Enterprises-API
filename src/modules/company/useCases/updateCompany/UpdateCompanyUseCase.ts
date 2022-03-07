import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUpdateCompanyDTO } from '@modules/company/dtos/ICompanyDTO';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
import { ICollaboratorRepository } from '@modules/company/repositories/ICollaboratorRepository';
import { ICompanysRepository } from '@modules/company/repositories/ICompanyRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateCompanyUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanysRepository,

    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  async execute({
    id,
    name,
    occupation_area,
    description,
    founded_in,
    user_id_action,
    email,
  }: IUpdateCompanyDTO): Promise<Company> {
    const userAction = await this.usersRepository.findById({
      id: user_id_action,
    });

    if (userAction.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2') {
      throw new AppError(
        'This user does not have permission to perform a create company',
        400,
      );
    }

    const compannyEdit = await this.companyRepository.findById({ id });

    if (!compannyEdit) {
      throw new AppError('company not already exists', 401);
    }

    const userDirector = await this.usersRepository.findByEmail({ email });

    if (!userDirector) {
      throw new AppError('email not already exists', 400);
    }

    const companny = await this.companyRepository.update({
      id: compannyEdit.id,
      name: name || compannyEdit.name,
      occupation_area: occupation_area || compannyEdit.occupation_area,
      description: description || compannyEdit.description,
      name_director: userDirector
        ? userDirector.full_name
        : compannyEdit.name_director,
      founded_in: founded_in || compannyEdit.founded_in,
    });

    await this.collaboratorRepository.delete({
      company_id: companny.id,
      type_office_id: 'ac555eb6-8768-467d-9d7f-ccd90b73a1a1',
      user_id: userDirector.id,
      active: false,
    });

    await this.collaboratorRepository.create({
      company_id: companny.id,
      type_office_id: 'ac555eb6-8768-467d-9d7f-ccd90b73a1a1',
      user_id: userDirector.id,
    });

    return companny;
  }
}

export { UpdateCompanyUseCase };
