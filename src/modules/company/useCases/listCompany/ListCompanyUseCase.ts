import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICompanyDTO } from '@modules/company/dtos/ICompanyDTO';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
import { ICompanysRepository } from '@modules/company/repositories/ICompanyRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class ListCompanyUseCase {
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
  }: ICompanyDTO): Promise<Company[]> {
    const userAction = await this.usersRepository.findById({
      id: user_id_action,
    });

    const userDirector = await this.usersRepository.findByEmail({ email });

    if (userAction.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2') {
      throw new AppError(
        'This user does not have permission to perform a list company',
        400,
      );
    }

    if (!userDirector && email) {
      throw new AppError('email not already exists', 400);
    }

    const companny = await this.companyRepository.list({
      name,
      occupation_area,
      description,
      founded_in,
      name_director: userDirector ? userDirector.full_name : '',
    });

    return companny;
  }
}

export { ListCompanyUseCase };
