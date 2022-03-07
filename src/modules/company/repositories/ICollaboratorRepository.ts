import {
  ICreateCollaboratorDTO,
  IFinbByUserCollaboratorDTO,
  IListCollaboratorDTO,
  IUnlikeCollaboratorDTO,
} from '../dtos/ICollaboratorDTO';
import { Collaborator } from '../infra/typeorm/entities/Collaborator';

interface ICollaboratorRepository {
  create(data: ICreateCollaboratorDTO): Promise<Collaborator>;
  list(data: IListCollaboratorDTO): Promise<Collaborator[]>;
  delete(data: IUnlikeCollaboratorDTO): Promise<Collaborator>;
  findByUser({ user_id }: IFinbByUserCollaboratorDTO): Promise<Collaborator>;
}

export { ICollaboratorRepository };
