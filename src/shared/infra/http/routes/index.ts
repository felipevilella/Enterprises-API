import { Router } from 'express';

import { auhenticateRoutes } from './authenticate.routes';
import { collaboratorRouter } from './collaborator.routes';
import { companyRouter } from './company.routes';
import { userRouter } from './user.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/company', companyRouter);
router.use('/collaborator', collaboratorRouter);
router.use(auhenticateRoutes);

export { router };
