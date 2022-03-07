import { TypeOffice } from '@modules/company/infra/typeorm/entities/TypeOffice';

interface ITypeOfficeRepository {
  findAll(): Promise<TypeOffice[]>;
}

export { ITypeOfficeRepository };
