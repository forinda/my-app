import { di } from '@/common/di';
import { Router } from 'express';
import { CreateWorkspaceController } from './controllers/create.controller';
import { UpdateWorkspaceController } from './controllers/update.controller';
import { FetchWorkspaceController } from './controllers/fetch.controller';
import { AddUserToWorkspaceController } from './controllers/add-users.controller';
import { RemoveUserFromWorkspaceController } from './controllers/remove-users.controller';

type Props = {
  app: Router;
};

export function setupWorkspaceRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchWorkspaceController).get)
    .post('/', di.resolve(CreateWorkspaceController).post)
    .put('/:id', di.resolve(UpdateWorkspaceController).put)
    .post('/add-member/:id', di.resolve(AddUserToWorkspaceController).post)
    .post(
      '/remove-member/:id',
      di.resolve(RemoveUserFromWorkspaceController).post
    );

  app.use('/workspaces', router);
}
