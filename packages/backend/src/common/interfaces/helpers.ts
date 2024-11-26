export type Promised<PromiseType> =
  PromiseType extends Promise<infer T> ? T : never;

export type PromisedAll<PromiseType> =
  PromiseType extends Promise<infer T> ? T[] : never;

export type PromisedReturnType<PromiseType> =
  PromiseType extends Promise<infer T> ? T : never;
