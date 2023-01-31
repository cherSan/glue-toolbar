import {Glue42} from "@glue42/desktop";
import {from, Observable, switchMap} from "rxjs";
export abstract class Interop<T, R> {
  private methodIsReady: boolean = false;
  protected constructor(
    protected readonly glue: Glue42.Glue,
    protected readonly name: string | Glue42.Interop.MethodDefinition
  ) {
    this.glue.interop.waitForMethod(this.name.toString())
      .then(() => this.methodIsReady = true)
      .catch(() => this.methodIsReady = false);
  }
  protected abstract readonly handler: (
    args: T,
    caller: Glue42.Interop.Instance,
    successCallback: (args: T) => void,
    errorCallback: (error?: string | object) => void
  ) => void;
  protected abstract readonly callFunction: (
    args: T,
    target: Glue42.Interop.InstanceTarget,
    options: Glue42.Interop.InvokeOptions
  ) => Observable<Glue42.Interop.InvocationResult<R>>;
  public readonly call = (args: T): Observable<Glue42.Interop.InvocationResult<R>> => {
    if (!this.methodIsReady) {
      return from(this.glue.interop.registerAsync(this.name, this.handler))
        .pipe(
          switchMap(() => this.callFunction(
            args,
            'best',
            {
              waitTimeoutMs: 1000*20,
              methodResponseTimeoutMs: 1000*20
            }
          ))
        )
    }
    return this.callFunction(
      args,
      'best',
      {
        waitTimeoutMs: 1000*20,
        methodResponseTimeoutMs: 1000*20
      }
    );
  }
}