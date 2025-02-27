import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { NewWorkspacePayload } from '../schema/schema';
import { newWorkspaceSchema } from '../schema/schema';
import { CreateWorkspaceService } from '../services/create.service';
import { userAudit } from '@/common/utils/user-request-audit';

@injectable()
@Dependency()
@Controller()
export class CreateWorkspaceController extends BasePostController {
  @inject(CreateWorkspaceService)
  private service: CreateWorkspaceService;
  @ApiControllerMethod({
    bodySchema: newWorkspaceSchema,
    pathParamTransform: {},
    auth: true,
    audit: userAudit('create'),
    bodyBindOrgId: true
  })
  async post({ res, body }: ApiRequestContext<NewWorkspacePayload>) {
    const feedback = await this.service.create({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
