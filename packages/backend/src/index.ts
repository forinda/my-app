import 'reflect-metadata';
import { di } from '@/common/di';
import { ApiServer } from '@/server';

const server = di.resolve(ApiServer);

server.run();
