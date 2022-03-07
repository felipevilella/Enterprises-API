import { LinkContributorController } from '@modules/company/useCases/linkContributor/LinkContributorController';
import { ListContributorController } from '@modules/company/useCases/listContributor/ListContributorController';
import { ListTypeOfficeController } from '@modules/company/useCases/listTypeOffice/ListTypeOfficeController';
import { UnlinkContributorController } from '@modules/company/useCases/unlinkContributor/UnlinkContributorController';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const collaboratorRouter = Router();

const listContributorController = new ListContributorController();
const linkContributorController = new LinkContributorController();
const unlinkContributor = new UnlinkContributorController();
const listTypeOfficeController = new ListTypeOfficeController();

collaboratorRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    body: Joi.object().keys({
      company_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
      user_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
      type_office_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),
  linkContributorController.handle,
);

collaboratorRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    query: Joi.object().keys({
      company_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
      user_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
      type_office_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),
  unlinkContributor.handle,
);

collaboratorRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    query: Joi.object().keys({
      company_id: Joi.string().guid({
        version: ['uuidv4'],
      }),
    }),
  }),
  listContributorController.handle,
);

collaboratorRouter.get('/listTypeOffice', listTypeOfficeController.handle);

export { collaboratorRouter };
