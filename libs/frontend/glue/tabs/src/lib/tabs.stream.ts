import {createStream} from "@launchpad/frontend/glue/interops";
import {Glue42} from "@glue42/desktop";
export type Stream = Glue42.Layouts.Layout[]
export const CORE_LAYOUTS = 'CORE_LAYOUTS';
export const layoutsStream = createStream<Stream>(
  CORE_LAYOUTS,
  async (stream: Glue42.Interop.Stream, glue: Glue42.Glue) => {
    await glue.layouts.ready()
    stream.push(glue.layouts.list());
    glue.layouts.onEvent(() => stream.push(glue.layouts.list()));
  }
)
