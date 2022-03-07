import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CompanyRepository } from '@modules/company/infra/typeorm/repositories/CompanyRepository';
import { ICompanysRepository } from '@modules/company/repositories/ICompanyRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICompanysRepository>(
  'CompanyRepository',
  CompanyRepository,
);
