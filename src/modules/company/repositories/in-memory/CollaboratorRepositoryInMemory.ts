import {
  ICreateCollaboratorDTO,
  IListCollaboratorDTO,
  IUnlikeCollaboratorDTO,
  IFinbByUserCollaboratorDTO,
} from '@modules/company/dtos/ICollaboratorDTO';
import { Collaborator } from '@modules/company/infra/typeorm/entities/Collaborator';
import { v4 as uuidV4 } from 'uuid';

import { ICollaboratorRepository } from '../ICollaboratorRepository';

class CollaboratorRepositoryInMemory implements ICollaboratorRepository {
  collaborators: Collaborator[] = [];

  async create({
    company_id,
    type_office_id,
    user_id,
  }: ICreateCollaboratorDTO): Promise<Collaborator> {
    const collaborator = new Collaborator();

    Object.assign(collaborator, {
      id: uuidV4(),
      company_id,
      type_office_id,
      user_id,
    });

    this.collaborators.push(collaborator);

    return collaborator;
  }

  async list({ company_id }: IListCollaboratorDTO): Promise<Collaborator[]> {
    return this.collaborators.filter(
      collaborator => collaborator.company_id === company_id,
    );
  }

  async delete({
    company_id,
    type_office_id,
    user_id,
    active,
  }: IUnlikeCollaboratorDTO): Promise<Collaborator> {
    const findIndex = this.collaborators.findIndex(
      collaborator =>
        collaborator.company_id === company_id &&
        collaborator.type_office_id === type_office_id &&
        collaborator.user_id === user_id,
    );

    this.collaborators[findIndex].active = active;

    return this.collaborators[findIndex];
  }

  findByUser({ user_id }: IFinbByUserCollaboratorDTO): Promise<Collaborator> {
    throw new Error('Method not implemented.');
  }
}

export { CollaboratorRepositoryInMemory };
