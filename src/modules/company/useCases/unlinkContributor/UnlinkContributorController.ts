import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UnlinkContributorUseCase } from './UnlinkContributorUseCase';

class UnlinkContributorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { company_id, user_id, type_office_id } = request.query;
    const unlinkContributorUseCase = container.resolve(
      UnlinkContributorUseCase,
    );

    console.log(request.query);

    const user = await unlinkContributorUseCase.execute({
      company_id,
      user_id,
      type_office_id,
      user_id_action: id,
    });

    return response.status(200).send(user);
  }
}

export { UnlinkContributorController };
