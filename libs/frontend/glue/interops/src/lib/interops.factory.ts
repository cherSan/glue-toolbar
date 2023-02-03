import {FactoryProvider, InjectionToken, Type} from "@angular/core";
import {Glue42Store} from "@glue42/ng";
import {first, firstValueFrom, from, Observable, of, switchMap} from "rxjs";
import {Glue42} from "@glue42/desktop";
export type InteropFactory<R> = {
  name: string,
  invoker: (args: object) => Observable<Glue42.Interop.InvocationResult<R>>
}
export const INTEROP_INJECTION = new InjectionToken('INTEROP_INJECTION');
export function createInterop<T, R>(
  name: string,
  handler: (arg: T, glue: Glue42.Glue, ...deps: Type<any>[]) => Promise<R>,
  deps?: Type<any>[]
): FactoryProvider {
  return {
    provide: INTEROP_INJECTION,
    multi: true,
    deps: [Glue42Store, ...(deps || [])],
    useFactory: async (glueStore: Glue42Store, ...deps: Type<any>[]): Promise<InteropFactory<R>> => {
      await firstValueFrom(glueStore.ready());
      const glue = glueStore.getGlue() as Glue42.Glue;
      return {
        name,
        invoker: (args: object): Observable<Glue42.Interop.InvocationResult<R>> => of(!!glue.interop.methods(name)?.length).pipe(
          switchMap((isExist) => {
            return isExist ?
              Promise.resolve() :
              glue.interop.registerAsync(name, (args: T) => handler(args, glue, ...deps));
          }),
          switchMap(() => {
            return from(
              glue.interop.invoke<R>(
                name,
                args,
                'best',
                {
                  waitTimeoutMs: 10000,
                  methodResponseTimeoutMs: 10000
                }
              )
            ).pipe(first())
          })
        )
      }
    }
  }
}
