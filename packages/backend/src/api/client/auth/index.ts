import { di } from '@/common/di';
import { Router } from 'express';
import { LoginUserController } from './controllers/login.controller';
import { GetUserSessionController } from './controllers/session.controller';
import { RegisterUserController } from './controllers/register.controller';
import { UserLogoutController } from './controllers/logout.controller';
import { SetCurrentOrganizationSessionIdController } from './controllers/set-current-organization.controller';

type Props = {
  app: Router;
};

export function setupAuthRoutes({ app }: Props) {
  const router = Router();

  router
    .post('/login', di.resolve(LoginUserController).post)
    .get('/session', di.resolve(GetUserSessionController).get)
    .post('/logout', di.resolve(UserLogoutController).post)
    .post('/register', di.resolve(RegisterUserController).post)
    .post(
      '/set-org',
      di.resolve(SetCurrentOrganizationSessionIdController).post
    );

  app.use('/auth', router);
}
