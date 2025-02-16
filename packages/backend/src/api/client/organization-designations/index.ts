import { di } from '@/common/di';
import { Router } from 'express';
import { CreateOrganizationDesignationController } from './controllers/create-organization-designation.controller';
import { FetchOrganizationDesignationController } from './controllers/fetch-organization-designation.controller';
import { UpdateOrganizationDesignationController } from './controllers/update-organization-designation.controller';

type Props = {
  app: Router;
};

export function setupOrganizationDesignationsRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchOrganizationDesignationController).get)
    .post('/', di.resolve(CreateOrganizationDesignationController).post)
    .put('/:id', di.resolve(UpdateOrganizationDesignationController).put);

  app.use('/organization-designations', router);
}
