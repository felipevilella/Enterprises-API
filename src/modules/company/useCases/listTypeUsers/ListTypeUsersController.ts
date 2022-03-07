import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTypeUsersUseCase } from './ListTypeUsersUseCase';

class ListTypeUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeUsersUseCase = container.resolve(ListTypeUsersUseCase);

    const typeUsers = await listTypeUsersUseCase.execute();

    return response.json(typeUsers);
  }
}

export { ListTypeUsersController };
