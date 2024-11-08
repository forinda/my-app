// import { Router } from "express";

import { Dependency } from "@/common/di";
import { HttpStatus } from "@/common/http";
import { Application, Router } from "express";
import { injectable } from "inversify";
type Versions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type ApiVersions = `/api/v${Versions}`;

@injectable()
@Dependency()
export class ApiV1 {
  protected router: Router;
  version: ApiVersions;

  constructor() {
    this.router = Router();
    this.version = "/api/v1";
  }
  setup(app: Application) {
    this.router.get("/", (req, res) => {
      return res.status(HttpStatus.OK).json({ message: "API works" });
    });
    app.use(this.version, this.router);
  }
}
