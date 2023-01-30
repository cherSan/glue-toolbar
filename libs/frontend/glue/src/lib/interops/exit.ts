import {InteropDescription} from "./interop-description.type";
import {Observable} from "rxjs";
import {Glue42} from "@glue42/desktop";
import {INTEROP_METHOD_PREFIX} from "./constants";

export const exit: InteropDescription<void, void> = {
  id: 'exit',
  name: { name: INTEROP_METHOD_PREFIX + 'exit' },
  handler: (glue) => {
    const currentWindowName = glue.windows.my().name;
    return () => glue.layouts.getCurrentLayout()
      .then(current => current && glue.layouts.hibernate(current.name))
      .then(() => glue.windows.find(currentWindowName).close())
  },
  callFunction: (glue) => {
    return () => {
      return new Observable<Glue42.Interop.InvocationResult<void>>(sub => {
        glue.interop.invoke<void>(INTEROP_METHOD_PREFIX + 'exit')
          .then((res) => {
            sub.next(res)
          })
          .catch((err) => {
            sub.error(err)
          })
      })
    }
  }
}
