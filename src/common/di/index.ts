import { Container } from "inversify";
import { autoBind } from "./auto-bind";

const di = new Container();

export function Dependency() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <T extends new (...args: []) => any>(target: T) => {
    autoBind()(target);
    di.bind<T>(target).toSelf();
  };
}

export { di };
