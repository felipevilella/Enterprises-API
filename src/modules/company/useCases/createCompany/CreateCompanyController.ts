import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompanyUseCase } from './CreateCompanyUseCase';

class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, occupation_area, description, founded_in, email } =
      request.body;
    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const companny = await createCompanyUseCase.execute({
      name,
      occupation_area,
      description,
      founded_in,
      email,
      user_id_action: id,
    });

    return response.status(201).send(companny);
  }
}

export { CreateCompanyController };
