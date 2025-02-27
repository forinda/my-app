// import { Router } from "express";

import { Dependency } from '@/common/di';
import { HttpStatus } from '@/common/http';
import type { Application } from 'express';
import { Router } from 'express';
import { injectable } from 'inversify';
import { setupAuthRoutes } from './client/auth';
import { setupOrganizationRoutes } from './client/organizations';
import { setupDepartmentRoutes } from './client/department';
import { setupOrganizationDesignationsRoutes } from './client/organization-designations';
import { setupOrganizationMemberRoutes } from './client/organization-members';
import { setupDepartmentTitleRoutes } from './client/department-title';
import { setupDepartmentRolesRoutes } from './client/department-roles';
import { setupWorkspaceRoutes } from './client/workspaces';
import { createHttpResponse } from '@/common/utils/responder';
import { setupProjectRoutes } from './client/projects';
import { setupProjectCategoriesRoutes } from './client/project-categories';
type Versions = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type ApiVersions = `/api/v${Versions}`;

@injectable()
@Dependency()
export class ApiV1 {
  protected router: Router;
  version: ApiVersions;

  constructor() {
    this.router = Router();
    this.version = '/api/v1';
  }
  setup(app: Application) {
    this.router.get('/', (req, res) => {
      return createHttpResponse(res, {
        message: 'API works',
        statusCode: HttpStatus.OK
      });
    });
    setupAuthRoutes({ app: this.router });
    setupOrganizationRoutes({ app: this.router });
    setupDepartmentRoutes({ app: this.router });
    setupOrganizationDesignationsRoutes({ app: this.router });
    setupOrganizationMemberRoutes({ app: this.router });
    setupDepartmentTitleRoutes({ app: this.router });
    setupDepartmentRolesRoutes({ app: this.router });
    setupWorkspaceRoutes({ app: this.router });
    setupProjectRoutes({ app: this.router });
    setupProjectCategoriesRoutes({ app: this.router });
    app.use(this.version, this.router);
  }
}
