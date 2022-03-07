import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { Router } from 'express';

const auhenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
auhenticateRoutes.post('/sessions', authenticateUserController.handle);

export { auhenticateRoutes };
