import { di } from '@/common/di';
import { Router } from 'express';
import { GetAllOrganizationsController } from './controllers';
import { CreateOrganizationController } from './controllers/create-organization.controller';
import { GetAllOrganizationMembersController } from './controllers/get-all-organization-members.controller';

type Props = {
  app: Router;
};

export function setupOrganizationRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(GetAllOrganizationsController).get)
    .post('/', di.resolve(CreateOrganizationController).post)
    .get('/:id/members', di.resolve(GetAllOrganizationMembersController).get);

  app.use('/organizations', router);
}
