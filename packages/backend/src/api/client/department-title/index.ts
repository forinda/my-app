import { di } from '@/common/di';
import { Router } from 'express';
import { CreateDepartmentTitleController } from './controllers/create-department.controller';
import { FetchOrganizationsController } from '../organizations/controllers/get-organizations.controller';
import { UpdateDepartmentTitleController } from './controllers/update-department-title.controller';

type Props = {
  app: Router;
};

export function setupDepartmentTitleRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchOrganizationsController).get)
    .post('/', di.resolve(CreateDepartmentTitleController).post)
    .put('/:id', di.resolve(UpdateDepartmentTitleController).put);

  app.use('/department-titles', router);
}
