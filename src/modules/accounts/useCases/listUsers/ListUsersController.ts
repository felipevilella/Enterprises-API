import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListUsersUseCase } from './ListUsersUseCase';

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const user = await listUsersUseCase.execute({
      id,
    });

    return response.status(200).send(user);
  }
}

export { ListUsersController };
