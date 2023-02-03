import {createStream} from "@launchpad/frontend/glue/interops";
import {Glue42} from "@glue42/desktop";
export type Stream = { name: string, id: string }
export const STREAM_NAME = 'CORE_WINDOWS';
export const windowsStream = createStream<Stream>(
  STREAM_NAME,
  async (stream: Glue42.Interop.Stream, glue: Glue42.Glue) => {
    await glue.windows.ready()
    glue.windows.onWindowAdded(() => stream.push(glue.windows.list().map(w => ({name: w.name, id: w.id}))))
    glue.windows.onWindowRemoved(() => stream.push(glue.windows.list().map(w => ({name: w.name, id: w.id}))))
    glue.windows.onWindowGotFocus(() => stream.push(glue.windows.list().map(w => ({name: w.name, id: w.id}))))
    glue.windows.onWindowLostFocus(() => stream.push(glue.windows.list().map(w => ({name: w.name, id: w.id}))))
  }
)
