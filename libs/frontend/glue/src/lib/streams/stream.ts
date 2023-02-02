import {Glue42} from "@glue42/desktop";
import {from, Observable, switchMap} from "rxjs";

export abstract class Stream<T> {
  private methodIsReady: boolean = false;
  protected constructor(
    protected readonly glue: Glue42.Glue,
    protected readonly name: string | Glue42.Interop.MethodDefinition
  ) {
    this.glue.interop.waitForMethod(this.name.toString())
      .then(() => this.methodIsReady = true)
      .catch(() => this.methodIsReady = false);
  }
  protected abstract readonly createStream: () => Promise<Glue42.Interop.Stream>;
  protected abstract readonly state: () => Promise<T>;
  get stream$() {
    if (!this.methodIsReady) {
      return from(this.createStream()).pipe(
        switchMap(() => {
          return new Observable<T>(sub => {
            this.state().then(data => sub.next(data));
            this.glue.interop.subscribe(this.name, {
              onData: ({ data }) => sub.next(data),
              onClosed: () => sub.complete(),
            }).then()
          })
        })
      )
    }
    return new Observable<T>(sub => {
      this.state().then(data => sub.next(data));
      this.glue.interop.subscribe(this.name, {
        onData: ({ data }) => sub.next(data),
        onClosed: () => sub.complete(),
      }).then()
    })
  }
}
