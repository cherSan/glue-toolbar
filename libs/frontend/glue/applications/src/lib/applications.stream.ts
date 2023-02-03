import {createStream} from "@launchpad/frontend/glue/interops";
import {Glue42} from "@glue42/desktop";
export type Stream = Glue42.AppManager.Application[]
export const STREAM_NAME = 'CORE_APPLICATIONS';
export const applicationsStream = createStream<Stream>(
  STREAM_NAME,
  async (stream: Glue42.Interop.Stream, glue: Glue42.Glue) => {
    await glue.appManager.ready()
    glue.appManager.onAppAdded(() => stream.push(glue.appManager.applications()))
    glue.appManager.onAppRemoved(() => stream.push(glue.appManager.applications()))
    glue.appManager.onAppChanged(() => stream.push(glue.appManager.applications()))
    glue.appManager.onAppAvailable(() => stream.push(glue.appManager.applications()))
    glue.appManager.onAppUnavailable(() => stream.push(glue.appManager.applications()))
  }
)
