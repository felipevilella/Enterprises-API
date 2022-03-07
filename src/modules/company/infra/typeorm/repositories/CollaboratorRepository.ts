import {
  ICreateCollaboratorDTO,
  IFinbByUserCollaboratorDTO,
  IListCollaboratorDTO,
  IUnlikeCollaboratorDTO,
} from '@modules/company/dtos/ICollaboratorDTO';
import { ICollaboratorRepository } from '@modules/company/repositories/ICollaboratorRepository';
import { getConnection, getRepository, Repository } from 'typeorm';

import { Collaborator } from '../entities/Collaborator';

class CollaboratorRepository implements ICollaboratorRepository {
  private repository: Repository<Collaborator>;

  constructor() {
    this.repository = getRepository(Collaborator);
  }

  async create({
    company_id,
    type_office_id,
    user_id,
  }: ICreateCollaboratorDTO): Promise<Collaborator> {
    const collaborator = this.repository.create({
      company_id,
      type_office_id,
      user_id,
    });

    await this.repository.save(collaborator);

    return collaborator;
  }

  async list({ company_id }: IListCollaboratorDTO): Promise<Collaborator[]> {
    const collaborator = await getConnection()
      .getRepository(Collaborator)
      .createQueryBuilder('collaboratos')
      .innerJoinAndSelect('collaboratos.user', 'user')
      .where('collaboratos.company_id = :company_id', { company_id })
      .getMany();

    return collaborator;
  }

  async delete({
    company_id,
    user_id,
    type_office_id,
    active,
  }: IUnlikeCollaboratorDTO): Promise<Collaborator> {
    await getConnection()
      .getRepository(Collaborator)
      .createQueryBuilder('collaboratos')
      .update(Collaborator)
      .set({ active })
      .where('company_id = :company_id', { company_id })
      .andWhere('user_id = :user_id', { user_id })
      .andWhere('type_office_id = :type_office_id', { type_office_id })

      .execute();

    const collaborator = await this.repository.findOne({ user_id });

    return collaborator;
  }

  async findByUser({
    user_id,
  }: IFinbByUserCollaboratorDTO): Promise<Collaborator> {
    const collaborator = await getConnection()
      .getRepository(Collaborator)
      .createQueryBuilder('collaboratos')
      .innerJoinAndSelect('collaboratos.user', 'user')
      .where('user.id = :user_id', { user_id })
      .getOne();

    return collaborator;
  }
}

export { CollaboratorRepository };
