import {Interop} from "./interop";
import {Observable} from "rxjs";
import {Glue42} from "@glue42/desktop";
import {INTEROP_METHOD_PREFIX} from "./constants";
export class InteropExit extends Interop<void, void> {
  constructor(glue: Glue42.Glue) {
    super(glue, `${INTEROP_METHOD_PREFIX}exit`);
  }
  protected readonly handler = () => {
    const currentWindowName = this.glue.windows.my().name;
    return this.glue.layouts.getCurrentLayout()
      .then((current) => current && this.glue.layouts.hibernate(current.name))
      .finally(() => this.glue.windows.find(currentWindowName).close())
  }
  protected readonly callFunction = () => {
    return new Observable<Glue42.Interop.InvocationResult<void>>(sub => {
      this.glue.interop.invoke<void>(this.name)
        .then((res) => {
          sub.next(res);
        })
        .catch((err) => {
          sub.error(err);
        })
    });
  }
}
