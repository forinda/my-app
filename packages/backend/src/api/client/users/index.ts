import { di } from '@/common/di';
import { Router } from 'express';
import { GetAllUsersController } from './controllers';
import { CreateUserController } from './controllers/create-user';
import { UpdateUserRoleController } from './controllers/assign-user-role';

type Props = {
  app: Router;
};

export function setupUsersRoutes({ app }: Props) {
  // console.log('setupUsersRoutes');

  const router = Router();

  router
    .get('/', di.resolve(GetAllUsersController).get)
    .post('/', di.resolve(CreateUserController).post)
    .post('/update-role', di.resolve(UpdateUserRoleController).post);

  app.use('/users', router);
}
