import {Glue42} from "@glue42/desktop";
import {CallFunction} from "./interops/interop-description.type";
import {interops} from "./interops";
export class GlueInterops {
  public readonly api: Glue42.Interop.API = this.glue.interop;
  private readonly interops: typeof interops = interops;
  private readonly list: Record<typeof interops[number]['id'], CallFunction<any, any>> = {};
  constructor(private glue: Glue42.Glue) {}
  public register() {
    const pr: Promise<void>[] = [];
    this.interops.forEach((interop) => {
      pr.push(this.api.registerAsync(interop.name, interop.handler(this.glue)));
      this.list[interop.id] = interop.callFunction(this.glue);
    });
    return Promise.all(pr);
  }
  public get(
    name: string,
    args?: any,
    target?: Glue42.Interop.InstanceTarget,
    options?: Glue42.Interop.InvokeOptions
  ) {
    return this.list[name](args, target, options);
  }
}
