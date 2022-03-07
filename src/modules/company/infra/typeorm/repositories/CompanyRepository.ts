import {
  ICompanyDTO,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
} from '@modules/company/dtos/ICompanyDTO';
import { ICompanysRepository } from '@modules/company/repositories/ICompanyRepository';
import { getConnection, getRepository, Repository } from 'typeorm';

import { Company } from '../entities/Company';

class CompanyRepository implements ICompanysRepository {
  private repository: Repository<Company>;

  constructor() {
    this.repository = getRepository(Company);
  }

  async create({
    name,
    occupation_area,
    description,
    founded_in,
    name_director,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = this.repository.create({
      name,
      occupation_area,
      description,
      name_director,
      founded_in,
    });

    await this.repository.save(company);

    const companyCreated = getConnection()
      .getRepository(Company)
      .createQueryBuilder('companys')
      .orderBy('created_at', 'DESC')
      .getOne();

    return companyCreated;
  }

  async findById({ id }: ICompanyDTO): Promise<Company> {
    const company = await getConnection()
      .getRepository(Company)
      .createQueryBuilder('companys')
      .where('companys.id = :id', { id })
      .getOne();

    return company;
  }

  async list({
    name,
    occupation_area,
    description,
    founded_in,
    name_director,
  }: ICompanyDTO): Promise<Company[]> {
    const companys = getRepository(Company)
      .createQueryBuilder('companys')
      .andWhere('companys.active = :active', { active: true });

    if (occupation_area) {
      companys.orWhere('companys.occupation_area = :occupation_area', {
        occupation_area,
      });
    }

    if (occupation_area) {
      companys.orWhere('companys.description = :description', { description });
    }

    if (founded_in) {
      companys.orWhere('companys.founded_in = :founded_in', { founded_in });
    }

    if (founded_in) {
      companys.orWhere('companys.name_director = :name_director', {
        name_director,
      });
    }

    if (founded_in) {
      companys.orWhere('companys.name = :name', { name });
    }

    const result = await companys.getMany();

    return result;
  }

  async update(data: IUpdateCompanyDTO): Promise<Company> {
    await getConnection()
      .getRepository(Company)
      .createQueryBuilder('companys')
      .update(Company)
      .set(data)
      .where('id = :id', { id: data.id })
      .execute();

    const company = await this.repository.findOne({ id: data.id });

    return company;
  }

  async delete({ active, id }: IUpdateCompanyDTO): Promise<Company> {
    await getConnection()
      .getRepository(Company)
      .createQueryBuilder('companys')
      .update(Company)
      .set({ active })
      .where('id = :id', { id })
      .execute();

    const company = await this.repository.findOne({ id });

    return company;
  }
}

export { CompanyRepository };
