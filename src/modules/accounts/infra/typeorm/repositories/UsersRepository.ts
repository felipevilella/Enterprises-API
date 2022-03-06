import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IUserDTO,
} from '@modules/accounts/dtos/IUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { getConnection, getRepository, Repository } from 'typeorm';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    full_name,
    birth_date,
    city_residence,
    email,
    password,
    type_schooling_id,
    type_user_id,
    uf_residence,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      full_name,
      birth_date,
      city_residence,
      email,
      password,
      type_schooling_id,
      type_user_id,
      uf_residence,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail({ email }: IUserDTO): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById({ id }: IUserDTO): Promise<User> {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();

    return user;
  }

  async list(): Promise<User[]> {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder('users')
      .where('users.active = :active', { active: true })
      .getMany();

    return user;
  }

  async findByIdDetails({ id }: IUserDTO): Promise<User> {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.typeUsers', 'typeUsers')
      .leftJoinAndSelect('users.profession', 'profession')
      .where('users.id = :id', { id })
      .getOne();

    return user;
  }

  async update(data: IUpdateUserDTO): Promise<User> {
    await getConnection()
      .getRepository(User)
      .createQueryBuilder('users')
      .update(User)
      .set(data)
      .where('id = :id', { id: data.id })
      .execute();

    const user = await this.repository.findOne({ id: data.id });

    return user;
  }

  async delete({ active, id }: IUpdateUserDTO): Promise<User> {
    await getConnection()
      .getRepository(User)
      .createQueryBuilder('users')
      .update(User)
      .set({ active })
      .where('id = :id', { id })
      .execute();

    const user = await this.repository.findOne({ id });

    return user;
  }
}

export { UsersRepository };
