import { BaseGetController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import { GetOrganizationsService } from '../services/get-organizations.service';
import { createHttpResponse } from '@/common/utils/responder';

@injectable()
@Dependency()
@Controller()
export class GetAllOrganizationsController extends BaseGetController {
  @inject(GetOrganizationsService)
  private getUsersService: GetOrganizationsService;

  @ApiControllerMethod({
    paginate: true,
    auth: true
  })
  async get({ res, pagination, user }: ApiRequestContext) {
    const feed = await this.getUsersService.get(user!.id!, pagination);

    return createHttpResponse(res, { ...feed, statusCode: feed.status });
  }
}
