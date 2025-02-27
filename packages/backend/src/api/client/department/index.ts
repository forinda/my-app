import { di } from '@/common/di';
import { Router } from 'express';
import { NewDepartmentController } from './controllers/create-department.controller';
import { UpdateDepartmentController } from './controllers/update-department.controller';
import { FetchDepartmentsController } from './controllers/fetch-departments.controller';
import { AddUserToDepartmentController } from './controllers/add-users-to-department.controller';

type Props = {
  app: Router;
};

export function setupDepartmentRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchDepartmentsController).get)
    .post('/', di.resolve(NewDepartmentController).post)
    .put('/:id', di.resolve(UpdateDepartmentController).put)
    .post('/add-member/:id', di.resolve(AddUserToDepartmentController).post);

  app.use('/departments', router);
}
