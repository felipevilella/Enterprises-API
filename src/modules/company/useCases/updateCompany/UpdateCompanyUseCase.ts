import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUpdateCompanyDTO } from '@modules/company/dtos/ICompanyDTO';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
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

    const userDirector = await this.usersRepository.findByEmail({ email });

    if (userAction.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2') {
      throw new AppError(
        'This user does not have permission to perform a create company',
        401,
      );
    }

    if (!userDirector) {
      throw new AppError('email not already exists', 401);
    }

    const compannyEdit = await this.companyRepository.findById({ id });

    if (!compannyEdit) {
      throw new AppError('company not already exists', 401);
    }

    const companny = await this.companyRepository.update({
      id,
      name: name || compannyEdit.name,
      occupation_area: occupation_area || compannyEdit.occupation_area,
      description: description || compannyEdit.description,
      name_director: userDirector.full_name,
      founded_in: founded_in || compannyEdit.founded_in,
    });

    return companny;
  }
}

export { UpdateCompanyUseCase };
