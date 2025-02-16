import { BasePostController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';

import { CreateOrganizationService } from '../services/create-organization.service';
import type { CreateOrganizationInputType } from '../schema/schema';
import { createOrganizationSchema } from '../schema/schema';

@injectable()
@Dependency()
@Controller()
export class CreateOrganizationController extends BasePostController {
  @inject(CreateOrganizationService)
  private createUserService: CreateOrganizationService;
  @ApiControllerMethod({
    bodySchema: createOrganizationSchema,
    auth: true
  })
  async post({ res, body }: ApiRequestContext<CreateOrganizationInputType>) {
    const feedback = await this.createUserService.create({ data: body! });

    return res.status(HttpStatus.CREATED).json(feedback);
  }
}
