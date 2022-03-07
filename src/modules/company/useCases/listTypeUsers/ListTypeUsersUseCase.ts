import { TypeUsers } from '@modules/accounts/infra/typeorm/entities/TypeUsers';
import { ITypeUsersRepository } from '@modules/accounts/repositories/ITypeUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListTypeUsersUseCase {
  constructor(
    @inject('TypeUsersRepository')
    private typeUsersRepository: ITypeUsersRepository,
  ) {}

  async execute(): Promise<TypeUsers[]> {
    const typeUsers = await this.typeUsersRepository.findAll();

    return typeUsers;
  }
}

export { ListTypeUsersUseCase };
