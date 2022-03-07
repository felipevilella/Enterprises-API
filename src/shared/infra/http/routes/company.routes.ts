import { CreateCompanyController } from '@modules/company/useCases/createCompany/CreateCompanyController';
import { DeleteCompanyController } from '@modules/company/useCases/deleteCompany/DeleteCompanyController';
import { DetailsCompanyController } from '@modules/company/useCases/detailCompany/DetailsCompanyController';
import { ListCompanyController } from '@modules/company/useCases/listCompany/ListCompanyController';
import { UpdateCompanyController } from '@modules/company/useCases/updateCompany/UpdateCompanyController';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const companyRouter = Router();

const createCompanyController = new CreateCompanyController();
const deleteCompanyController = new DeleteCompanyController();
const detailsCompanyController = new DetailsCompanyController();
const listCompanyController = new ListCompanyController();
const updateCompanyController = new UpdateCompanyController();

companyRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      occupation_area: Joi.string().required(),
      description: Joi.string().required(),
      founded_in: Joi.string().required(),
    }),
  }),
  createCompanyController.handle,
);

companyRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    query: Joi.object().keys({
      company_id: Joi.string().guid({
        version: ['uuidv4'],
      }),
    }),
  }),
  detailsCompanyController.handle,
);

companyRouter.get(
  '/list',
  ensureAuthenticated,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string().email(),
      occupation_area: Joi.string(),
      description: Joi.string(),
      founded_in: Joi.string(),
    }),
  }),
  listCompanyController.handle,
);

companyRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    query: Joi.object().keys({
      company_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),
  deleteCompanyController.handle,
);

companyRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    body: Joi.object().keys({
      company_id: Joi.string().guid({
        version: ['uuidv4'],
      }),
      name: Joi.string(),
      email: Joi.string().required().email(),
      occupation_area: Joi.string(),
      description: Joi.string(),
      founded_in: Joi.string(),
    }),
  }),
  updateCompanyController.handle,
);

export { companyRouter };
