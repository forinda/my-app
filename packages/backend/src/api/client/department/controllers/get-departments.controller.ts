import { BaseGetController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import { FetchDepartmentService } from '../services/get-department.service';
import { createHttpResponse } from '@/common/utils/responder';

@injectable()
@Dependency()
@ApiController()
export class GetDepartmentsController extends BaseGetController {
  @inject(FetchDepartmentService)
  private fetchDepartmentsService: FetchDepartmentService;

  @ApiControllerMethod({
    paginate: true,
    auth: true
  })
  async get({ res, pagination, user }: ApiRequestContext) {
    const feed = await this.fetchDepartmentsService.get(user!.id!, pagination);

    return createHttpResponse(res, { ...feed, statusCode: feed.status });
  }
}
