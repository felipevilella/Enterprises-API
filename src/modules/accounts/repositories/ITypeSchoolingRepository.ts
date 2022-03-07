import { TypeSchooling } from '../infra/typeorm/entities/TypeSchooling';

interface ITypeSchoolingRepository {
  findAll(): Promise<TypeSchooling[]>;
}

export { ITypeSchoolingRepository };
