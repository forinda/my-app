import { di } from '@/common/di';
import { Router } from 'express';
import { AddDepartmentRoleController } from './controllers/create-department-role.controller';

type Props = {
  app: Router;
};

export function setupDepartmentRolesRoutes({ app }: Props) {
  const router = Router();

  router.post('/', di.resolve(AddDepartmentRoleController).post);

  app.use('/department-roles', router);
}
