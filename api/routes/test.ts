import { Request, Response } from "express";
import { Injector } from "../helper/injector";
import { Service, Log } from "../helper/decorator";

export class Test {
  testApi() {
    return (req: Request, res: Response) => {
      res.send({ status: "Up and running" });
    };
  }
}

// DECORATOR TEST

@Service()
class Foo {
  @Log()
  doFooStuff(val: any, deps?: any) {
    const { fetch, validate, aws } = deps;
    console.log("test", val);
    console.log(fetch, validate, aws);
  }
}

@Service()
class Bar {
  constructor(public foo: Foo) {}

  doBarStuff() {
    console.log("bar");
  }
}

@Service()
class Foobar {
  constructor(public foo: Foo, public bar: Bar) {}
}

const foobar = Injector.resolve<Foobar>(Foobar);

foobar.bar.doBarStuff();
foobar.foo.doFooStuff("mack");
foobar.bar.foo.doFooStuff("mack");
