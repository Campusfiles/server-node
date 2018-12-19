import { GenericClassDecorator, Type } from "./util";
import { stringify } from "querystring";

/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Service = (): GenericClassDecorator<Type<any>> => {
  return (target: Type<any>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};

export function Log(): any {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    console.log("Target", descriptor.value);
    descriptor.value = (...args: any) => {
      console.log(args);
      return method.apply(null, [...args, { fetch: "fetch", validate: "validate", aws: "aws" }]);
    };
  };
}
