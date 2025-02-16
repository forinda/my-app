import { di } from '@/common/di';
import { Router } from 'express';
import { CreateOrganizationController } from './controllers/create-organization.controller';
import { FetchOrganizationsController } from './controllers/get-organizations.controller';

type Props = {
  app: Router;
};

export function setupOrganizationRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchOrganizationsController).get)
    .post('/', di.resolve(CreateOrganizationController).post);

  app.use('/organizations', router);
}
