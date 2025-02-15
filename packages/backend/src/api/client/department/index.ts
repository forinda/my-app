import { di } from '@/common/di';
import { Router } from 'express';
import { NewDepartmentController } from './controllers/create-department.controller';
import { GetAllOrganizationMembersController } from './controllers/get-all-organization-members.controller';
import { GetAllOrganizationsController } from '../organizations/controllers';

type Props = {
  app: Router;
};

export function setupDepartmentRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(GetAllOrganizationsController).get)
    .post('/', di.resolve(NewDepartmentController).post)
    .get('/:id/members', di.resolve(GetAllOrganizationMembersController).get);

  app.use('/department', router);
}
