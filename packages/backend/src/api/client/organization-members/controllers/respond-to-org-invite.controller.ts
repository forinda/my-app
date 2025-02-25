import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import { userAudit } from '@/common/utils/user-request-audit';
import type { RespondToOrgInviteType } from '../schema';
import { respondToOrgInviteSchema } from '../schema';
import { RespondToOrgInviteService } from '../services/respond-to-org-invite.service';

@injectable()
@Dependency()
@Controller()
export class RespondToOrgInviteController extends BasePostController {
  @inject(RespondToOrgInviteService)
  private service: RespondToOrgInviteService;
  @ApiControllerMethod({
    bodySchema: respondToOrgInviteSchema,
    auth: true,
    audit: userAudit('create'),
    bodyBindOrgId: true,
    pathParamTransform: {
      id: 'invite_id'
    }
  })
  async post({ res, body }: ApiRequestContext<RespondToOrgInviteType>) {
    const feedback = await this.service.add({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
