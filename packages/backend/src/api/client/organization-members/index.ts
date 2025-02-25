import { di } from '@/common/di';
import { Router } from 'express';
import { FetchOrganizationMembersController } from './controllers/fetch-organization-members.controller';
import { RemoveOrganizationMembersController } from './controllers/remove-organization-member.controller';
import { AddOrganizationMemberController } from './controllers/add-organization-member.controller';
import { FetchOrganizationMemberInvitesController } from './controllers/fetch-org-members-invites.controller';
import { RespondToOrgInviteController } from './controllers/respond-to-org-invite.controller';

type Props = {
  app: Router;
};

export function setupOrganizationMemberRoutes({ app }: Props) {
  const router = Router();

  router
    .get('/', di.resolve(FetchOrganizationMembersController).get)
    .post('/add', di.resolve(AddOrganizationMemberController).post)
    .post('/remove', di.resolve(RemoveOrganizationMembersController).post)
    .get('/invites', di.resolve(FetchOrganizationMemberInvitesController).get)
    .post('/respond/:id', di.resolve(RespondToOrgInviteController).post);

  app.use('/organization-members', router);
}
