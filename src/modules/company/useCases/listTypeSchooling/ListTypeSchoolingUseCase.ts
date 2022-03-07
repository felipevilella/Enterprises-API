import { TypeSchooling } from '@modules/accounts/infra/typeorm/entities/TypeSchooling';
import { ITypeSchoolingRepository } from '@modules/accounts/repositories/ITypeSchoolingRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListTypeSchoolingUseCase {
  constructor(
    @inject('TypeSchoolingRepository')
    private typeSchoolingRepository: ITypeSchoolingRepository,
  ) {}

  async execute(): Promise<TypeSchooling[]> {
    const typeUsers = await this.typeSchoolingRepository.findAll();

    return typeUsers;
  }
}

export { ListTypeSchoolingUseCase };
