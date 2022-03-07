import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTypeSchoolingUseCase } from './ListTypeSchoolingUseCase';

class ListTypeSchoolingController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeSchoolingUseCase = container.resolve(
      ListTypeSchoolingUseCase,
    );

    const typeUsers = await listTypeSchoolingUseCase.execute();

    return response.json(typeUsers);
  }
}

export { ListTypeSchoolingController };
