import {
  ApiController,
  ApiControllerMethod,
} from "@/common/decorators/controller.decorator";
import { Dependency } from "@/common/di";
import { HttpStatus } from "@/common/http";
import {
  ApiRequestContext,
  BaseControllerType,
} from "@/common/interfaces/controller";
import { injectable } from "inversify";



@injectable()
@Dependency()
@ApiController()
export class GetAllUsersController implements BaseControllerType {
  @ApiControllerMethod({})
  async get({ res, query }: ApiRequestContext) {
    return res.status(HttpStatus.OK).json({ message: "API works", query });
  }
}
