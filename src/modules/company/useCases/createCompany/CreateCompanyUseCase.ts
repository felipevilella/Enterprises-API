import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateCompanyDTO } from '@modules/company/dtos/ICompanyDTO';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
import { ICollaboratorRepository } from '@modules/company/repositories/ICollaboratorRepository';
import { ICompanysRepository } from '@modules/company/repositories/ICompanyRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanysRepository,

    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}
  async execute({
    name,
    occupation_area,
    description,
    founded_in,
    user_id_action,
    email,
  }: ICreateCompanyDTO): Promise<Company> {
    const userAction = await this.usersRepository.findById({
      id: user_id_action,
    });

    if (userAction.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2') {
      throw new AppError(
        'This user does not have permission to perform a create company',
        400,
      );
    }

    const userDirector = await this.usersRepository.findByEmail({ email });

    if (!userDirector) {
      throw new AppError('email not already exists', 400);
    }

    const company = await this.companyRepository.create({
      name,
      occupation_area,
      description,
      founded_in,
      name_director: userDirector.full_name,
    });

    await this.collaboratorRepository.create({
      company_id: company.id,
      type_office_id: 'ac555eb6-8768-467d-9d7f-ccd90b73a1a1',
      user_id: userDirector.id,
    });

    return company;
  }
}

export { CreateCompanyUseCase };
