import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCompanyUseCase } from './DeleteCompanyUseCase';

class DeleteCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { company_id } = request.query;

    const deleteCompanyUseCase = container.resolve(DeleteCompanyUseCase);

    const companny = await deleteCompanyUseCase.execute({
      id: company_id,
      user_id_action: id,
    });

    return response.status(202).send(companny);
  }
}

export { DeleteCompanyController };
