import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListContributorUseCase } from './ListContributorUseCase';

class ListContributorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { company_id } = request.query;
    const listContributorUseCase = container.resolve(ListContributorUseCase);

    const user = await listContributorUseCase.execute({
      company_id,
      user_id_action: id,
    });

    return response.status(200).send(user);
  }
}

export { ListContributorController };
