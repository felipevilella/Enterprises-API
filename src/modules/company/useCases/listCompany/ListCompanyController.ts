import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCompanyUseCase } from './ListCompanyUseCase';

class ListCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, occupation_area, description, founded_in, email } =
      request.body;

    const listCompanyUseCase = container.resolve(ListCompanyUseCase);

    const user = await listCompanyUseCase.execute({
      name,
      occupation_area,
      description,
      founded_in,
      user_id_action: id,
      email,
    });

    return response.status(200).send(user);
  }
}

export { ListCompanyController };
