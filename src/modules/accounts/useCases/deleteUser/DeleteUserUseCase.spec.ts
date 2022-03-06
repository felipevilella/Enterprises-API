import {
  ICreateUserDTO,
  IUpdateUserDTO,
} from '@modules/accounts/dtos/IUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUsers/CreateUserUseCase';
import { DeleteUserUseCase } from './DeleteUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Delete user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    deleteUserUseCase = new DeleteUserUseCase(userRepositoryInMemory);
  });

  it('should be able to delete user by admin', async () => {
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

    const userBasic: ICreateUserDTO = {
      full_name: 'Josefina Cardoso Pereira',
      birth_date: '1996/04/12',
      city_residence: 'Belo Horizonte',
      email: 'josefina@hotmail.com',
      password: '@teste123',
      type_schooling_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705e6',
      type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5',
      uf_residence: 'MG',
    };

    const resultUserBasic = await createUserUseCase.execute(userBasic);

    const dataUser: IUpdateUserDTO = {
      user_id_action: resultUserAdmin.id,
      id: resultUserBasic.id,
    };

    const result = await deleteUserUseCase.execute(dataUser);
    expect(result).toHaveProperty('id');
  });

  it('should not be able to delete user by outer user basic', async () => {
    expect(async () => {
      const userBasic: ICreateUserDTO = {
        full_name: 'Josefina Cardoso Pereira',
        birth_date: '1996/04/12',
        city_residence: 'Belo Horizonte',
        email: 'josefina@hotmail.com',
        password: '@teste123',
        type_schooling_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705e6',
        type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5',
        uf_residence: 'MG',
      };

      const outerUserBasicOuter: ICreateUserDTO = {
        full_name: 'Julia alves',
        birth_date: '1996/04/12',
        city_residence: 'Belo Horizonte',
        email: 'julia@enterprises.com.br',
        password: '@teste123',
        type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5',
        uf_residence: 'MG',
      };

      const resultOuterUserBasic = await createUserUseCase.execute(
        outerUserBasicOuter,
      );

      const resultUserBasic = await createUserUseCase.execute(userBasic);

      const dataUser: IUpdateUserDTO = {
        user_id_action: resultOuterUserBasic.id,
        id: resultUserBasic.id,
      };

      await deleteUserUseCase.execute(dataUser);
    }).rejects.toBeInstanceOf(AppError);
  });
});
