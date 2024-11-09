function boundMethod(
  target: any,
  key: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  if (typeof originalMethod !== 'function') {
    throw new TypeError(
      `@boundMethod decorator can only be applied to methods and not: ${typeof originalMethod}`
    );
  }

  return {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);

      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return boundFn;
        },
        set(value) {
          Object.defineProperty(this, key, {
            value,
            configurable: true,
            writable: true
          });
        }
      });

      return boundFn;
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function boundClass<T extends Function>(target: T) {
  const propertyNames = Object.getOwnPropertyNames(target.prototype);
  const symbolKeys =
    typeof Object.getOwnPropertySymbols === 'function'
      ? Object.getOwnPropertySymbols(target.prototype)
      : [];

  [...propertyNames, ...symbolKeys].forEach((key) => {
    if (key !== 'constructor') {
      const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

      if (descriptor?.value && typeof descriptor.value === 'function') {
        Object.defineProperty(
          target.prototype,
          key,
          boundMethod(target, key, descriptor)
        );
      }
    }
  });

  return target;
}

export function autoBind() {
  return <T>(
    target: T,
    key?: string | symbol,
    descriptor?: PropertyDescriptor
  ) => {
    if (key === undefined && descriptor === undefined) {
      return boundClass(target as any);
    } else if (key !== undefined && descriptor !== undefined) {
      return boundMethod(target, key, descriptor);
    }
    throw new Error('Invalid usage for @autoBind decorator');
  };
}
