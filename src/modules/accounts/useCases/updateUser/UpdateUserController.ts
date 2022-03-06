import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      user_id,
      full_name,
      birth_date,
      city_residence,
      email,
      password,
      type_schooling_id,
      type_user_id,
      uf_residence,
    } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      user_id_action: id,
      id: user_id,
      full_name,
      birth_date,
      city_residence,
      email,
      password,
      type_schooling_id,
      type_user_id,
      uf_residence,
    });

    return response.status(202).send(user);
  }
}

export { UpdateUserController };
