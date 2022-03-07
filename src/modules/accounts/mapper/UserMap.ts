import { classToClass } from 'class-transformer';

import { IUserResponseDTO } from '../dtos/IUserDTO';
import { User } from '../infra/typeorm/entities/User';

class UserMap {
  static toDTO({
    id,
    full_name,
    email,
    type_user_id,
    birth_date,
    uf_residence,
    city_residence,
    type_schooling_id,
    active,
  }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      full_name,
      email,
      type_user_id,
      birth_date,
      uf_residence,
      city_residence,
      type_schooling_id,
      active,
    });

    return user;
  }
}

export { UserMap };
