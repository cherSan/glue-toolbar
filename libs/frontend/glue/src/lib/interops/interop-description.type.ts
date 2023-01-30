import {Glue42} from "@glue42/desktop";
import {Observable} from "rxjs";

export type HandlerFunction<T> = (
  args: T,
  caller: Glue42.Interop.Instance,
  successCallback: (args?: T) => void,
  errorCallback: (error?: string | object) => void
) => void

export type CallFunction<T, R> = (
  args?: T,
  target?: Glue42.Interop.InstanceTarget,
  options?: Glue42.Interop.InvokeOptions
) => Observable<Glue42.Interop.InvocationResult<R>>;

export type InteropDescription<T, R> = {
  id: string;
  name: Glue42.Interop.MethodDefinition,
  handler: (glue: Glue42.Glue) => HandlerFunction<T>
  callFunction: (glue: Glue42.Glue) => CallFunction<T, R>
}
