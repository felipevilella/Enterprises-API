import { ITypeSchoolingRepository } from '@modules/accounts/repositories/ITypeSchoolingRepository';
import { getConnection, getRepository, Repository } from 'typeorm';
import { TypeSchooling } from '../entities/TypeSchooling';

import { TypeUsers } from '../entities/TypeUsers';

class TypeSchoolingRepository implements ITypeSchoolingRepository {
  private repository: Repository<TypeUsers>;

  constructor() {
    this.repository = getRepository(TypeUsers);
  }
  async findAll(): Promise<TypeSchooling[]> {
    const usersCategories = await getConnection()
      .getRepository(TypeSchooling)
      .createQueryBuilder('TypeSchooling')
      .getMany();

    return usersCategories;
  }
}

export { TypeSchoolingRepository };
