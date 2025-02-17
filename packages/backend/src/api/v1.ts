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
      return res.status(HttpStatus.OK).json({ message: 'API works' });
    });
    setupAuthRoutes({ app: this.router });
    setupOrganizationRoutes({ app: this.router });
    setupDepartmentRoutes({ app: this.router });
    setupOrganizationDesignationsRoutes({ app: this.router });
    setupOrganizationMemberRoutes({ app: this.router });
    setupDepartmentTitleRoutes({ app: this.router });
    app.use(this.version, this.router);
  }
}
