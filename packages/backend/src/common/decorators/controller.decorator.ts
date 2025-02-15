import type { z } from 'zod';
import type { ApiRequestContext } from '../interfaces/controller';
import { PayloadValidator } from '../schema/validator';
import { extractPaginationParams } from '../utils/pagination';
import { IpFinder } from '@/api/client/auth/utils/get-client-ip';
import { convertToNumber, isNumber } from '../utils/numbers';
import { UUID } from '../utils/uuid';
import { di } from '../di';
import type { LoginAuthorityOption } from '../utils/controller-auth';
import { controllerAuth } from '../utils/controller-auth';

export function ApiController() {
  return function (
    target: any
    //   key: string,
    //   descriptor: PropertyDescriptor
  ) {
    const apiMethods = [
      'post',
      'get',
      'delete',
      'patch',
      'put',
      'options',
      'head'
    ];
    const original = target;
    const properties = Object.getOwnPropertyNames(original.prototype);
    const validProperties = properties.filter((p) => apiMethods.includes(p));

    validProperties.forEach((propertyKey) => {
      // console.log("propertyKey", { propertyKey });

      const originalMethod = original.prototype[propertyKey];

      original.prototype[propertyKey] = async function (...args: any[]) {
        const [req, res, next] = args;
        const { params, query, body } = req;
        const uuid = di.resolve(UUID);
        const request_id =
          (req.headers['x-request-id'] as string) || uuid.generateUUID();

        const context: ApiRequestContext = {
          req,
          res,
          next,
          params,
          query,
          body,
          request_id
        };

        try {
          // Execute the original method within the try block
          await originalMethod.apply(this, [context]);
        } catch (error) {
          // Pass the error to the next middleware
          if (next) {
            next(error);
          } else {
            console.error('Unhandled error in controller method:', error);

            return res.status(500).send('An unexpected error occurred.');
          }
        }
      };
    });

    return original;
  };
}

type MethodProps = {
  paramSchema?: z.Schema;
  querySchema?: z.Schema;
  bodySchema?: z.Schema;
  paginate?: boolean;
  injectIpInBody?: boolean;
  //We need to transform the query to the body
  transformParams?: {
    [queryParameterKey: string]: string;
  };
  auditPayloadInjector?: (context: ApiRequestContext) => ApiRequestContext;
  auth?: LoginAuthorityOption;
};

export function ApiControllerMethod(props: MethodProps = {}) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const validator = new PayloadValidator();

    descriptor.value = async function (...args: any[]) {
      const [context] = args as [ApiRequestContext];

      try {
        if (props.auth) await controllerAuth(context)(props.auth);
        const { params, query } = context;
        const needToTransformParams =
          typeof props.transformParams === 'object' &&
          props.transformParams !== null
            ? Object.keys(props.transformParams).length > 0
            : false;
        const clientIp = new IpFinder().getClientIp(context.req);

        if (props.injectIpInBody) {
          if (props.bodySchema) {
            Object.assign(context.body, { ip: clientIp });
          } else {
            Object.assign(context.body, { ip: clientIp });
          }
        }
        if (typeof props.auditPayloadInjector === 'function') {
          props.auditPayloadInjector(context);
        }
        if (needToTransformParams) {
          Object.keys(props.transformParams!).forEach((key) => {
            context.body[props.transformParams![key]] = isNumber(params![key])
              ? convertToNumber(params![key])
              : params![key];
          });
        }
        const pagination = props.paginate
          ? extractPaginationParams(query!)
          : null;

        context.params = props.paramSchema
          ? validator.validate(props.paramSchema, params)
          : params;
        context.query = props.querySchema
          ? validator.validate(props.querySchema, query)
          : query;

        context.body = props.bodySchema
          ? validator.validate(props.bodySchema, context.body)
          : context.body;

        if (pagination) {
          context.pagination = pagination;
        }

        return originalMethod.apply(this, args);
      } catch (error) {
        return context.next(error);
      }
    };

    return descriptor;
  };
}
