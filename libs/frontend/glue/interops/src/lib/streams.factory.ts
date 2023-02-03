import {FactoryProvider, InjectionToken, Type} from "@angular/core";
import {Glue42Store} from "@glue42/ng";
import {firstValueFrom, Observable, of, switchMap} from "rxjs";
import {Glue42} from "@glue42/desktop";
export type StreamFactory<T>  = {
  name: string,
  observer: Observable<T>
}
export const STREAM_INJECTION = new InjectionToken('STREAM_INJECTION');
export function createStream<T>(
  name: string,
  listener: (stream: Glue42.Interop.Stream, glue: Glue42.Glue, ...deps: Type<any>[]) => Promise<void>,
  deps?: Type<any>[]
): FactoryProvider {
  return {
    provide: STREAM_INJECTION,
    multi: true,
    deps: [Glue42Store, ...(deps || [])],
    useFactory: async (glueStore: Glue42Store, ...deps: Type<any>[]): Promise<StreamFactory<T>> => {
      await firstValueFrom(glueStore.ready());
      const glue = glueStore.getGlue() as Glue42.Glue;
      return {
        name,
        observer: of(!!glue.interop.methods(name)?.length).pipe(
          switchMap((isExist) => {
            return isExist ?
              Promise.resolve() :
              glue.interop.createStream(name).then(stream => listener(stream, glue, ...deps));
          }),
          switchMap(() => {
            return new Observable<T>(sub => {
              glue.interop.subscribe(
                name,
                {
                  onData: ({data}) => sub.next(data as T),
                  onClosed: () => sub.complete(),
                  methodResponseTimeout: 10000,
                  waitTimeoutMs: 10000
                }
              )
            })
          })
        )
      }
    }
  }
}
