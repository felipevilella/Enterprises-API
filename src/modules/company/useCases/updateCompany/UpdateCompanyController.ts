import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCompanyUseCase } from './UpdateCompanyUseCase';

class UpdateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const {
      company_id,
      name,
      occupation_area,
      description,
      founded_in,
      email,
    } = request.body;

    const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase);

    const companny = await updateCompanyUseCase.execute({
      id: company_id,
      name,
      occupation_area,
      description,
      founded_in,
      email,
      user_id_action: id,
    });

    return response.status(202).send(companny);
  }
}

export { UpdateCompanyController };
