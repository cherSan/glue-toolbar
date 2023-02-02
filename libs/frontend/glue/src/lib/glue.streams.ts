import {Glue42} from "@glue42/desktop";
import {StreamWindows} from "./streams/windows";
export class GlueStreams {
  public readonly api: Glue42.Interop.API = this.glue.interop;
  windows = new StreamWindows(this.glue);
  constructor(private glue: Glue42.Glue) {}
}
