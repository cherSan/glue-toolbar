import {createStream} from "@launchpad/frontend/glue/interops";
import {Glue42} from "@glue42/desktop";
export type CLStream = Glue42.Layouts.Layout | undefined;
export const CORE_CURRENT_LAYOUT = 'CORE_CURRENT_LAYOUT';
export const currentLayoutStream = createStream<CLStream>(
  CORE_CURRENT_LAYOUT,
  async (stream: Glue42.Interop.Stream, glue: Glue42.Glue) => {
    await glue.layouts.ready()
    glue.layouts.getCurrentLayout().then(lo => stream.push(lo || {}));
    glue.layouts.onEvent(() => glue.layouts.getCurrentLayout().then(lo => stream.push(lo || {})));
  }
)
