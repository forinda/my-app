import { Dependency } from '@/common/di';
import type { ApiReq } from '@/common/http';
import { injectable } from 'inversify';

@injectable()
@Dependency()
export class IpFinder {
  getClientIp(req: ApiReq) {
    const ip =
      req.headers?.['x-forwarded-for'] ||
      req.ip ||
      req.socket?.['remoteAddress'];

    return ip;
  }
}
