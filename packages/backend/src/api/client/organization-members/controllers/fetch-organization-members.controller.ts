import { BaseGetController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import { createHttpResponse } from '@/common/utils/responder';
import { FetchOrganizationMembersService } from '../services/fetch-organization-members.service';

@injectable()
@Dependency()
@Controller()
export class FetchOrganizationMembersController extends BaseGetController {
  @inject(FetchOrganizationMembersService)
  private getUsersService: FetchOrganizationMembersService;

  @ApiControllerMethod({
    paginate: true,
    auth: true
  })
  async get({
    res,
    pagination,
    current_organization_id,
    query
  }: ApiRequestContext) {
    const feed = await this.getUsersService.get(
      { current_organization_id: current_organization_id!, ...query },
      pagination!
    );

    return createHttpResponse(res, { ...feed, statusCode: feed.status });
  }
}
