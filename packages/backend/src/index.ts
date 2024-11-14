import 'reflect-metadata';
import { di } from '@/common/di';
import { ApiServer } from '@/server';
// import { inspect } from 'util';
// console.log(inspect(di, { colors: true, compact: true }));

const server = di.resolve(ApiServer);

server.run();
