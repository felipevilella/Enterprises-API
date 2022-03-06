import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      full_name,
      birth_date,
      city_residence,
      email,
      password,
      type_schooling_id,
      type_user_id,
      uf_residence,
    } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      full_name,
      birth_date,
      city_residence,
      email,
      password,
      type_schooling_id,
      type_user_id,
      uf_residence,
    });

    return response.status(201).send(user);
  }
}

export { CreateUserController };
