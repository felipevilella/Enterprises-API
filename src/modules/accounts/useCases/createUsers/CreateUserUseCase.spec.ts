import { ICreateUserDTO } from '@modules/accounts/dtos/IUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from './CreateUserUseCase';

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create user', async () => {
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

    const result = await createUserUseCase.execute(user);

    expect(result).toHaveProperty('id');
  });

  it('should not be able to create with user exist', async () => {
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

    await createUserUseCase.execute(user);

    expect(async () => {
      const user: ICreateUserDTO = {
        full_name: 'Josefina Miranda Tavares',
        birth_date: '1991/01/01',
        city_residence: 'Belo Horizonte',
        email: 'josefina@hotmail.com',
        password: '@teste123',
        type_schooling_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705e6',
        type_user_id: 'c1e1a7de-b446-45d2-bb5b-3d067a7705d5',
        uf_residence: 'MG',
      };

      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
