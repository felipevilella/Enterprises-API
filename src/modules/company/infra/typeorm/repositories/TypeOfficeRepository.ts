import { TypeOffice } from '@modules/company/infra/typeorm/entities/TypeOffice';
import { ITypeOfficeRepository } from '@modules/company/repositories/ITypeOfficeRepository';
import { getConnection, getRepository, Repository } from 'typeorm';

class TypeOfficeRepository implements ITypeOfficeRepository {
  private repository: Repository<TypeOffice>;
  constructor() {
    this.repository = getRepository(TypeOffice);
  }
  async findAll(): Promise<TypeOffice[]> {
    const usersCategories = await getConnection()
      .getRepository(TypeOffice)
      .createQueryBuilder('TypeUsers')
      .getMany();

    return usersCategories;
  }
}

export { TypeOfficeRepository };
