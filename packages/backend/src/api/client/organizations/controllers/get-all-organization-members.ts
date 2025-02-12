import { BaseGetController } from '@/common/bases/controller';
import {
  ApiController,
  ApiControllerMethod
} from '@/common/decorators/controller.decorator';
import { Dependency } from '@/common/di';
import type { ApiRequestContext } from '@/common/interfaces/controller';
import { inject, injectable } from 'inversify';
import { LoginRequired } from '@/common/decorators/login-required.decorator';
import { createHttpResponse } from '@/common/utils/responder';
import { GetOrganizationMembersService } from '../services/get-organization-members.service';

@injectable()
@Dependency()
@ApiController()
export class GetAllOrganizationMembersController extends BaseGetController {
  @inject(GetOrganizationMembersService)
  private memberService: GetOrganizationMembersService;

  @ApiControllerMethod({
    paginate: true
  })
  @LoginRequired()
  async get({ res, user, req }: ApiRequestContext) {
    const feed = await this.memberService.get(
      user!.id!,
      req.params.id as string
    );

    return createHttpResponse(res, feed);
  }
}
