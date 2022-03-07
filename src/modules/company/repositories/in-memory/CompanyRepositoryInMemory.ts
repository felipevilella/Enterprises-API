import {
  ICompanyDTO,
  ICreateCompanyDTO,
  IUpdateCompanyDTO,
} from '@modules/company/dtos/ICompanyDTO';
import { Company } from '@modules/company/infra/typeorm/entities/Company';
import { v4 as uuidV4 } from 'uuid';

import { ICompanysRepository } from '../ICompanyRepository';

class CompanyRepositoryInMemory implements ICompanysRepository {
  companys: Company[] = [];

  async create({
    name,
    occupation_area,
    description,
    founded_in,
    name_director,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = new Company();

    Object.assign(company, {
      id: uuidV4(),
      name,
      occupation_area,
      description,
      founded_in,
      name_director,
      active: true,
    });

    this.companys.push(company);

    return company;
  }

  async findById({ id }: ICompanyDTO): Promise<Company> {
    return this.companys.find(company => company.id === id);
  }

  async update({
    id,
    name,
    occupation_area,
    description,
    founded_in,
    name_director,
  }: IUpdateCompanyDTO): Promise<Company> {
    const findIndex = this.companys.findIndex(company => company.id === id);

    this.companys[findIndex].name = name;
    this.companys[findIndex].occupation_area = occupation_area;
    this.companys[findIndex].description = description;
    this.companys[findIndex].founded_in = founded_in;
    this.companys[findIndex].name_director = name_director;

    return this.companys[findIndex];
  }

  async delete({ id, active }: IUpdateCompanyDTO): Promise<Company> {
    const findIndex = this.companys.findIndex(company => company.id === id);

    this.companys[findIndex].active = active;

    return this.companys[findIndex];
  }

  async list({
    name,
    occupation_area,
    description,
    founded_in,
    name_director,
  }: ICompanyDTO): Promise<Company[]> {
    const filter = this.companys.filter(
      company =>
        company.name === name ||
        company.occupation_area === occupation_area ||
        company.description === description ||
        company.founded_in === founded_in ||
        company.name_director === name_director,
    );

    return filter;
  }
}

export { CompanyRepositoryInMemory };
