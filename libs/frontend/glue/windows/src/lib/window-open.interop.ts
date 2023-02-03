import {Glue42} from "@glue42/desktop";
import {createInterop} from "@launchpad/frontend/glue/interops";
export type Window = {
  name: string;
  url: string;
  options: Glue42.Windows.WindowCreateOptions;
}
export const INTEROP_NAME_OPEN = 'CORE_WINDOW_OPEN';
export const windowOpenInterop = createInterop<Window, string>(
  INTEROP_NAME_OPEN,
  async (window: Window, glue: Glue42.Glue) => {
    await glue.windows.ready();
    return glue.windows.open(window.name, window.url, window.options).then((w) => w.id);
  }
)
