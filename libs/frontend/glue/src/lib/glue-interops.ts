import {Glue42} from "@glue42/desktop";
import {InteropExit} from "./interops/exit";
export class GlueInterops {
  public readonly api: Glue42.Interop.API = this.glue.interop;
  private readonly interopExit = new InteropExit(this.glue);
  public readonly exit = this.interopExit.call;
  constructor(private glue: Glue42.Glue) {}
}
