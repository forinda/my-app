import { di } from '@/common/di';
import { Router } from 'express';
import { GetAllRolesController } from './controllers';
import { CreateRoleController } from './controllers/create-role';
import { UpdateRoleController } from './controllers/update-role';

type Props = {
  app: Router;
};

export function setupRolesRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(GetAllRolesController).get)
    .post('/', di.resolve(CreateRoleController).post)
    .put('/:id', di.resolve(UpdateRoleController).put);

  app.use('/roles', router);
}
