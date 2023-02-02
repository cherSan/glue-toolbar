import {Glue42} from "@glue42/desktop";
import {Stream} from "./stream";
import {STREAM_METHOD_PREFIX} from "./constants";
type Window = {
  title: string;
  name: string;
  id: string;
  isFocused: boolean;
}
export class StreamWindows extends Stream<Window[]>{
  constructor(glue: Glue42.Glue) {
    super(glue, `${STREAM_METHOD_PREFIX}windows`);
  }
  protected readonly createStream = () => {
    return this.glue.interop.createStream(this.name).then((stream) => {
      this.glue.windows.onWindowAdded(() => this.state().then((w) => stream.push(w)))
      this.glue.windows.onWindowRemoved(() => this.state().then((w) => stream.push(w)))
      this.glue.windows.onWindowGotFocus(() => this.state().then((w) => stream.push(w)))
      this.glue.windows.onWindowLostFocus(() => this.state().then((w) => stream.push(w)))
      return stream;
    });
  }
  protected readonly state = () => Promise.resolve(this.glue.windows.list().map(w => ({
    name: w.name,
    id: w.id,
    isFocused: w.isFocused,
    title: w.title
  })));
}
