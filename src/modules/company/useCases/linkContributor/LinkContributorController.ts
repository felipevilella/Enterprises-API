import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LinkContributorUseCase } from './LinkContributorUseCase';

class LinkContributorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { company_id, user_id, type_office_id } = request.body;

    const linkContributorUseCase = container.resolve(LinkContributorUseCase);

    const user = await linkContributorUseCase.execute({
      company_id,
      user_id,
      type_office_id,
      user_id_action: id,
    });

    return response.status(201).send(user);
  }
}

export { LinkContributorController };
