import { di } from '@/common/di';
import { expect, test } from 'vitest';
import { IpFinder } from './get-client-ip';
import type { ApiReq } from '@/common/http';

const sampleReq = {
  headers: {
    'x-forwarded-for': '192.0.2.146'
  },
  ip: '192.0.2.146',
  socket: {
    remoteAddress: '192.0.2.146'
  },
  connection: {
    remoteAddress: '192.0.2.146'
  }
} as unknown as ApiReq;

test('get client ip through "x-forwarded-for" header', async () => {
  const getClientIp = di.resolve(IpFinder).getClientIp;
  const ip = getClientIp(sampleReq);

  expect(ip).toMatchInlineSnapshot(`"192.0.2.146"`);
});

test('get client ip through "req.ip" property', async () => {
  const getClientIp = di.resolve(IpFinder).getClientIp;
  const ip = getClientIp(sampleReq);

  expect(ip).toMatchInlineSnapshot(`"192.0.2.146"`);
});

test('get client ip through "req.socket.remoteAddress" property', async () => {
  const getClientIp = di.resolve(IpFinder).getClientIp;
  const ip = getClientIp(sampleReq);

  expect(ip).toMatchInlineSnapshot(`"192.0.2.146"`);
});
