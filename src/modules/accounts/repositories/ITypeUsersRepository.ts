import { TypeUsers } from '../infra/typeorm/entities/TypeUsers';

interface ITypeUsersRepository {
  findAll(): Promise<TypeUsers[]>;
}

export { ITypeUsersRepository };
