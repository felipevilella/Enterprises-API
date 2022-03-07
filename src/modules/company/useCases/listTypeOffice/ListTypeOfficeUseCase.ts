import { TypeSchooling } from '@modules/accounts/infra/typeorm/entities/TypeSchooling';
import { ITypeOfficeRepository } from '@modules/company/repositories/ITypeOfficeRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListTypeOfficeUseCase {
  constructor(
    @inject('TypeOfficeRepository')
    private typeOfficeRepository: ITypeOfficeRepository,
  ) {}

  async execute(): Promise<TypeSchooling[]> {
    const typeUsers = await this.typeOfficeRepository.findAll();

    return typeUsers;
  }
}

export { ListTypeOfficeUseCase };
