import { TypeSchoolingRepository } from '@modules/accounts/infra/typeorm/repositories/TypeSchoolingRepository';
import { TypeUsersRepository } from '@modules/accounts/infra/typeorm/repositories/TypeUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ITypeSchoolingRepository } from '@modules/accounts/repositories/ITypeSchoolingRepository';
import { ITypeUsersRepository } from '@modules/accounts/repositories/ITypeUsersRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { CollaboratorRepository } from '@modules/company/infra/typeorm/repositories/CollaboratorRepository';
import { CompanyRepository } from '@modules/company/infra/typeorm/repositories/CompanyRepository';
import { TypeOfficeRepository } from '@modules/company/infra/typeorm/repositories/TypeOfficeRepository';
import { ICollaboratorRepository } from '@modules/company/repositories/ICollaboratorRepository';
import { ICompanysRepository } from '@modules/company/repositories/ICompanyRepository';
import { ITypeOfficeRepository } from '@modules/company/repositories/ITypeOfficeRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICompanysRepository>(
  'CompanyRepository',
  CompanyRepository,
);

container.registerSingleton<ICollaboratorRepository>(
  'CollaboratorRepository',
  CollaboratorRepository,
);

container.registerSingleton<ITypeUsersRepository>(
  'TypeUsersRepository',
  TypeUsersRepository,
);

container.registerSingleton<ITypeSchoolingRepository>(
  'TypeSchoolingRepository',
  TypeSchoolingRepository,
);

container.registerSingleton<ITypeOfficeRepository>(
  'TypeOfficeRepository',
  TypeOfficeRepository,
);
