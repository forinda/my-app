import { di } from '@/common/di';
import { Router } from 'express';
import { LoginUserController } from './controllers/login';
import { GetUserSessionController } from './controllers/session.controller';
import { RegisterUserController } from './controllers/register';

type Props = {
  app: Router;
};

export function setupAuthRoutes({ app }: Props) {
  // console.log('setupUsersRoutes');

  const router = Router();

  router
    .post('/login', di.resolve(LoginUserController).post)
    .post('/session', di.resolve(GetUserSessionController).post)
    .post('/register', di.resolve(RegisterUserController).post);

  app.use('/auth', router);
}
