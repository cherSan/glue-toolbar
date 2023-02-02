import {Interop} from "./interop";
import {Observable} from "rxjs";
import {Glue42} from "@glue42/desktop";
import {INTEROP_METHOD_PREFIX} from "./constants";
export class InteropInformation extends Interop<void, boolean> {
  constructor(glue: Glue42.Glue) {
    super(glue, `${INTEROP_METHOD_PREFIX}information`);
  }
  protected readonly handler = () => {
    const window = this.glue.windows.find('information-window');
    if (window) {
      return window.activate().then(() => true);
    }
    return this.glue.windows.open(
    'information-window',
      'http://localhost:4210',
      {
        allowChannels: false,
        allowClose: true,
        allowMinimize: false,
        allowMaximize: false,
        hasMoveAreas: false,
        hasSizeAreas: false,
        mode: "flat",
        startLocation: 'center',
        width: 800,
        height: 500
      }
    ).then(() => true)
  }
  protected readonly callFunction = () => {
    return new Observable<Glue42.Interop.InvocationResult<boolean>>(sub => {
      this.glue.interop.invoke<boolean>(this.name)
        .then((res) => {
          sub.next(res);
        })
        .catch((err) => {
          sub.error(err);
        })
    });
  }
}
