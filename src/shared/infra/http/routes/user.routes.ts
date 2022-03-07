import { TypeUsersRepository } from '@modules/accounts/infra/typeorm/repositories/TypeUsersRepository';
import { CreateUserController } from '@modules/accounts/useCases/createUsers/CreateUserController';
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController';
import { DetailsUserController } from '@modules/accounts/useCases/detailUser/DetailsUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';
import { ListTypeSchoolingController } from '@modules/company/useCases/listTypeSchooling/ListTypeSchoolingController';
import { ListTypeUsersController } from '@modules/company/useCases/listTypeUsers/ListTypeUsersController';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRouter = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const detailsUserController = new DetailsUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const listTypeUsersController = new ListTypeUsersController();
const listTypeSchoolingController = new ListTypeSchoolingController();

userRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      full_name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      birth_date: Joi.string().required(),
      uf_residence: Joi.string().required(),
      city_residence: Joi.string().required(),
      type_schooling_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),
  createUserController.handle,
);

userRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    query: Joi.object().keys({
      user_id: Joi.string().guid({
        version: ['uuidv4'],
      }),
    }),
  }),
  detailsUserController.handle,
);

userRouter.get('/list', ensureAuthenticated, listUsersController.handle);

userRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    query: Joi.object().keys({
      user_id: Joi.string()
        .guid({
          version: ['uuidv4'],
        })
        .required(),
    }),
  }),
  deleteUserController.handle,
);

userRouter.put(
  '/',
  ensureAuthenticated,
  celebrate({
    body: Joi.object().keys({
      full_name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      birth_date: Joi.string(),
      uf_residence: Joi.string(),
      city_residence: Joi.string(),
      user_id: Joi.string().guid({
        version: ['uuidv4'],
      }),
      type_schooling_id: Joi.string().guid({
        version: ['uuidv4'],
      }),
    }),
  }),
  updateUserController.handle,
);

userRouter.get('/listTypeUser', listTypeUsersController.handle);
userRouter.get('/listTypeSchooling', listTypeSchoolingController.handle);

export { userRouter };
