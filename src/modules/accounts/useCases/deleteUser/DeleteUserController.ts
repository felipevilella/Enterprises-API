import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { user_id } = request.body;

    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    const user = await deleteUserUseCase.execute({
      user_id_action: id,
      id: user_id,
      active: false,
    });

    return response.status(202).send(user);
  }
}

export { DeleteUserController };
