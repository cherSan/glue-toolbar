import {EnvironmentProviders, Provider, Type} from "@angular/core";

export type BootstrapOptions = {
  component?: Type<unknown>,
  providers?: Array<Provider | EnvironmentProviders>
}
// export interface Interop<R, T = object, D = Provider | EnvironmentProviders> {
//   name: string;
//   handler: (glue: Glue42.Glue, ...providers: D[]) =>
//     (
//       args?: T,
//       caller?: Glue42.Interop.Instance,
//     ) => Promise<void | boolean>;
//   deps?: D[];
//   caller?: Observable<Glue42.Interop.InvocationResult<R>>
// }
// export type Interops = Interop<unknown>[]
