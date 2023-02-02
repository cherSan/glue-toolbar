import {Glue42} from "@glue42/desktop";
import {InteropExit} from "./interops/exit";
import {InteropInformation} from "./interops/information";
export class GlueInterops {
  public readonly api: Glue42.Interop.API = this.glue.interop;
  private readonly interopExit = new InteropExit(this.glue);
  private readonly interopInformation = new InteropInformation(this.glue);
  public readonly exit = this.interopExit.call;
  public readonly information = this.interopInformation.call;
  constructor(
    private glue: Glue42.Glue,
    public readonly application: Record<string, (any: any) => any>
  ) {}
}
