import { ICreateUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUsers/CreateUserUseCase';
import {
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
} from '@modules/company/dtos/ICompanyDTO';
import { CollaboratorRepositoryInMemory } from '@modules/company/repositories/in-memory/CollaboratorRepositoryInMemory';
import { CompanyRepositoryInMemory } from '@modules/company/repositories/in-memory/CompanyRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateCompanyUseCase } from '../createCompany/CreateCompanyUseCase';
import { DeleteCompanyUseCase } from './DeleteCompanyUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let companyRepositoryInMemory: CompanyRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let createCompanyUseCase: CreateCompanyUseCase;
let deleteCompanyUseCase: DeleteCompanyUseCase;
let collaboratorRepositoryInMemory: CollaboratorRepositoryInMemory;

describe('Delete companny', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    companyRepositoryInMemory = new CompanyRepositoryInMemory();
    collaboratorRepositoryInMemory = new CollaboratorRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

    createCompanyUseCase = new CreateCompanyUseCase(
      userRepositoryInMemory,
      companyRepositoryInMemory,
      collaboratorRepositoryInMemory
    );

    deleteCompanyUseCase = new DeleteCompanyUseCase(
      userRepositoryInMemory,
      companyRepositoryInMemory,
    );
  });

  it('should be able to delete company', async () => {
    const user: ICreateUserDTO = {
      full_name: 'Josefina Cardoso Pereira',
      birth_date: '1996/04/12',
      city_residence: 'Belo Horizonte',
      email: 'josefina@hotmail.com',
      password: '@teste123',
      type_schooling_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705e6',
      type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5',
      uf_residence: 'MG',
    };

    const resultUserBasic = await createUserUseCase.execute(user);

    const userAdmin: ICreateUserDTO = {
      full_name: 'administrador',
      birth_date: '1996/04/12',
      city_residence: 'Belo Horizonte',
      email: 'administrador@enterprises.com.br',
      password: '@teste123',
      type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2',
      uf_residence: 'MG',
    };

    const resultUserAdmin = await createUserUseCase.execute(userAdmin);

    const company: ICreateCompanyDTO = {
      name: 'IOASYS DESENVOLVIMENTO DE SOFTWARE LTDA',
      occupation_area: 'Tecnologia',
      description:
        'Somos especialistas em criar soluções únicas para empresas ousadas. Digitalmente, mas sempre com alma.',
      founded_in: '2018/10/08',
      user_id_action: resultUserAdmin.id,
      email: resultUserBasic.email,
    };

    const companyCreated = await createCompanyUseCase.execute(company);

    const companyDelete: IUpdateCompanyDTO = {
      user_id_action: resultUserAdmin.id,
      id: companyCreated.id,
    };

    const result = await deleteCompanyUseCase.execute(companyDelete);

    expect(result).toHaveProperty('id');
  });

  it('should not be able to delete with company exist', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        full_name: 'Josefina Cardoso Pereira',
        birth_date: '1996/04/12',
        city_residence: 'Belo Horizonte',
        email: 'josefina@hotmail.com',
        password: '@teste123',
        type_schooling_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705e6',
        type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5',
        uf_residence: 'MG',
      };

      const resultUserBasic = await createUserUseCase.execute(user);

      const userAdmin: ICreateUserDTO = {
        full_name: 'administrador',
        birth_date: '1996/04/12',
        city_residence: 'Belo Horizonte',
        email: 'administrador@enterprises.com.br',
        password: '@teste123',
        type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2',
        uf_residence: 'MG',
      };

      const resultUserAdmin = await createUserUseCase.execute(userAdmin);

      const company: ICreateCompanyDTO = {
        name: 'IOASYS DESENVOLVIMENTO DE SOFTWARE LTDA',
        occupation_area: 'Tecnologia',
        description:
          'Somos especialistas em criar soluções únicas para empresas ousadas. Digitalmente, mas sempre com alma.',
        founded_in: '2018/10/08',
        user_id_action: resultUserAdmin.id,
        email: resultUserBasic.email,
      };

      await createCompanyUseCase.execute(company);

      const companyUpdate: IUpdateCompanyDTO = {
        user_id_action: resultUserAdmin.id,
        id: 'bccc7b5c-f9da-4cb1-9d0a-36da57e1e3e3',
        name: 'IOASYS DESENVOLVIMENTO DE SOFTWARE',
      };

      await deleteCompanyUseCase.execute(companyUpdate);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete with user basic', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        full_name: 'Josefina Cardoso Pereira',
        birth_date: '1996/04/12',
        city_residence: 'Belo Horizonte',
        email: 'josefina@hotmail.com',
        password: '@teste123',
        type_schooling_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705e6',
        type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5',
        uf_residence: 'MG',
      };

      const resultUserBasic = await createUserUseCase.execute(user);

      const userAdmin: ICreateUserDTO = {
        full_name: 'administrador',
        birth_date: '1996/04/12',
        city_residence: 'Belo Horizonte',
        email: 'administrador@enterprises.com.br',
        password: '@teste123',
        type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d2',
        uf_residence: 'MG',
      };

      const resultUserAdmin = await createUserUseCase.execute(userAdmin);

      const company: ICreateCompanyDTO = {
        name: 'IOASYS DESENVOLVIMENTO DE SOFTWARE LTDA',
        occupation_area: 'Tecnologia',
        description:
          'Somos especialistas em criar soluções únicas para empresas ousadas. Digitalmente, mas sempre com alma.',
        founded_in: '2018/10/08',
        user_id_action: resultUserAdmin.id,
        email: resultUserBasic.email,
      };

      const companyCreated = await createCompanyUseCase.execute(company);

      const companyDelete: IUpdateCompanyDTO = {
        user_id_action: resultUserBasic.id,
        id: companyCreated.id,
      };

      await deleteCompanyUseCase.execute(companyDelete);
    }).rejects.toBeInstanceOf(AppError);
  });
});
