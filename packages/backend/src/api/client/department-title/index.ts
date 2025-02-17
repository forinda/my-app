import { di } from '@/common/di';
import { Router } from 'express';
import { CreateDepartmentTitleController } from './controllers/create-department.controller';
import { UpdateDepartmentTitleController } from './controllers/update-department-title.controller';
import { FetchDepartmentTitleController } from './controllers/fetch-departments.controller';

type Props = {
  app: Router;
};

export function setupDepartmentTitleRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchDepartmentTitleController).get)
    .post('/', di.resolve(CreateDepartmentTitleController).post)
    .put('/:id', di.resolve(UpdateDepartmentTitleController).put);

  app.use('/department-titles', router);
}
