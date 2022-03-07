import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DetailsUserUseCase } from './DetailsUserUseCase';

class DetailsUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { user_id } = request.query;

    const detailsUseCase = container.resolve(DetailsUserUseCase);

    const user = await detailsUseCase.execute({
      user_id_action: id,
      id: user_id || id,
    });

    return response.status(200).send(user);
  }
}

export { DetailsUserController };
