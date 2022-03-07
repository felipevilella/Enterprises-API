import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DetailsCompanyUseCase } from './DetailsCompanyUseCase';

class DetailsCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { company_id } = request.body;

    const detailsCompanyUseCase = container.resolve(DetailsCompanyUseCase);

    const user = await detailsCompanyUseCase.execute({
      user_id_action: id,
      id: company_id,
    });

    return response.status(200).send(user);
  }
}

export { DetailsCompanyController };
