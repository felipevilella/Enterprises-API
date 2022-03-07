import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTypeOfficeUseCase } from './ListTypeOfficeUseCase';

class ListTypeOfficeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTypeOfficeUseCase = container.resolve(ListTypeOfficeUseCase);

    const typeUsers = await listTypeOfficeUseCase.execute();

    return response.json(typeUsers);
  }
}

export { ListTypeOfficeController };
