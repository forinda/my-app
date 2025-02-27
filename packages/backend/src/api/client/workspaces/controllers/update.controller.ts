import { BasePutController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import type { UpdateWorkspacePayload } from '../schema/schema';
import { updateWorkspaceSchema } from '../schema/schema';
import { UpdateWorkspaceService } from '../services/update.service';
import { userAudit } from '@/common/utils/user-request-audit';

@injectable()
@Dependency()
@Controller()
export class UpdateWorkspaceController extends BasePutController {
  @inject(UpdateWorkspaceService)
  private service: UpdateWorkspaceService;
  @ApiControllerMethod({
    audit: userAudit('update'),
    auth: true,
    bodyBindOrgId: true,
    bodySchema: updateWorkspaceSchema,
    pathParamTransform: {
      id: 'workspace_id'
    }
  })
  async put({ res, body }: ApiRequestContext<UpdateWorkspacePayload>) {
    const feedback = await this.service.update({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
