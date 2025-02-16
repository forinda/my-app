import { di } from '@/common/di';
import { Router } from 'express';
import { FetchOrganizationMembersController } from './controllers/fetch-organization-members.controller';
import { RemoveOrganizationMembersController } from './controllers/remove-organization-member.controller';
import { AddOrganizationMemberController } from './controllers/add-organization-member.controller';

type Props = {
  app: Router;
};

export function setupOrganizationMemberRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchOrganizationMembersController).get)
    .post('/add', di.resolve(AddOrganizationMemberController).post)
    .post('/remove', di.resolve(RemoveOrganizationMembersController).post);

  app.use('/organization-members', router);
}
