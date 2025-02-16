import { di } from '@/common/di';
import { Router } from 'express';
import { NewDepartmentController } from './controllers/create-department.controller';
import { FetchOrganizationsController } from '../organizations/controllers/get-organizations.controller';
import { UpdateDepartmentController } from './controllers/update-department.controller';

type Props = {
  app: Router;
};

export function setupDepartmentRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchOrganizationsController).get)
    .post('/', di.resolve(NewDepartmentController).post)
    .put('/:id/members', di.resolve(UpdateDepartmentController).put);

  app.use('/department', router);
}
