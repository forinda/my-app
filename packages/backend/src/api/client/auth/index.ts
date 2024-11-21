import { di } from '@/common/di';
import { Router } from 'express';
import { CreateUserController } from './controllers/login';
import { RefreshTokenController } from './controllers/refresh-token';

type Props = {
  app: Router;
};

export function setupAuthRoutes({ app }: Props) {
  // console.log('setupUsersRoutes');

  const router = Router();

  router
    .post('/login', di.resolve(CreateUserController).post)
    .post('/refresh-token', di.resolve(RefreshTokenController).post);

  app.use('/auth', router);
}
