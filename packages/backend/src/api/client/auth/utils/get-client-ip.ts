import { Dependency } from '@/common/di';
import type { ApiReq } from '@/common/http';
import { injectable } from 'inversify';

@injectable()
@Dependency()
export class IpFinder {
  getClientIp(req: ApiReq) {
    const ip = req.ip;
    const socketRemoteAddress = req.socket?.remoteAddress;
    const xForwardedFor = req.headers?.['x-forwarded-for'];

    return xForwardedFor || socketRemoteAddress || ip || '';
  }
}
