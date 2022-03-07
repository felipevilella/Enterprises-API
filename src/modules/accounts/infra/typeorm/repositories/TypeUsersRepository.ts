import { ITypeUsersRepository } from '@modules/accounts/repositories/ITypeUsersRepository';
import { getConnection, getRepository, Repository } from 'typeorm';

import { TypeUsers } from '../entities/TypeUsers';

class TypeUsersRepository implements ITypeUsersRepository {
  private repository: Repository<TypeUsers>;
  constructor() {
    this.repository = getRepository(TypeUsers);
  }
  async findAll(): Promise<TypeUsers[]> {
    const usersCategories = await getConnection()
      .getRepository(TypeUsers)
      .createQueryBuilder('TypeUsers')
      .getMany();

    return usersCategories;
  }
}

export { TypeUsersRepository };
