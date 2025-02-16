import { BaseGetController } from '@/common/bases/controller';
import {
  Controller,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import { FetchOrganizationDesignationService } from '../services/fetch-org-designation.service';
import { createHttpResponse } from '@/common/utils/responder';

@injectable()
@Dependency()
@Controller()
export class FetchOrganizationDesignationController extends BaseGetController {
  @inject(FetchOrganizationDesignationService)
  private service: FetchOrganizationDesignationService;

  @ApiControllerMethod({
    paginate: true,
    auth: true
  })
  async get({
    res,
    pagination,
    user,
    current_organization_id
  }: ApiRequestContext) {
    console.log('current_organization_id', current_organization_id);

    const feed = await this.service.get(user!.id!, pagination);

    return createHttpResponse(res, { ...feed, statusCode: feed.status });
  }
}
