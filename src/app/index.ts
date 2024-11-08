import { ApiV1 } from "@/api/v1";
import { Dependency } from "@/common/di";
import express, { Application } from "express";
import { inject, injectable } from "inversify";

@injectable()
@Dependency()
export class ApiServerSetup {
  @inject(ApiV1) private readonly apiV1: ApiV1;

  setupExpressApp(app: Application) {
    app.use(express.json({ limit: "100mb" }));
    app.use(express.urlencoded({ extended: true }));
    this.apiV1.setup(app);
  }
}
