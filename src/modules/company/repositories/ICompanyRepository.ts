import {
  ICreateCompanyDTO,
  ICompanyDTO,
  IUpdateCompanyDTO,
} from '../dtos/ICompanyDTO';
import { Company } from '../infra/typeorm/entities/Company';

interface ICompanysRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  findById({ id }: ICompanyDTO): Promise<Company>;
  list(data: ICompanyDTO): Promise<Company[]>;
  update(data: IUpdateCompanyDTO): Promise<Company>;
  delete({ active }: IUpdateCompanyDTO): Promise<Company>;
}

export { ICompanysRepository };
