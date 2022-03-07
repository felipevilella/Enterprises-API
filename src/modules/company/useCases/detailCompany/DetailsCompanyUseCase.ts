import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDetailtCompany } from '@modules/company/dtos/ICompanyDTO';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
import { ICompanysRepository } from '@modules/company/repositories/ICompanyRepository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

@injectable()
class DetailsCompanyUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanysRepository,
  ) {}

  async execute({ user_id_action, id }: IDetailtCompany): Promise<Company> {
    const userAction = await this.usersRepository.findById({
      id: user_id_action,
    });

    if (userAction.type_user_id !== 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2') {
      throw new AppError(
        'This user does not have permission to perform a details company',
        400,
      );
    }

    const companny = await this.companyRepository.findById({ id });

    return companny;
  }
}

export { DetailsCompanyUseCase };
