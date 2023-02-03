import {Glue42} from "@glue42/desktop";
import {createInterop} from "@launchpad/frontend/glue/interops";
export const INTEROP_NAME_CLOSE = 'CORE_WINDOW_CLOSE';
export type CloseWindowData = {
  name: string;
  withChild: boolean
}
export const windowCloseInterop = createInterop<CloseWindowData, void>(
  INTEROP_NAME_CLOSE,
  async (data: CloseWindowData, glue: Glue42.Glue) => {
    await glue.windows.ready();
    const window = glue.windows.find(data.name);
    if (!window) return;
    if (data.withChild === undefined || data.withChild) {
      async function closeWindowWidthChild(window: Glue42.Windows.GDWindow) {
        const child = await window.getChildWindows();
        if (child.length) {
          for (let i = 0; i < child.length; i++) {
            await closeWindowWidthChild(child[i]);
          }
        }
        await window.close()
      }
      await closeWindowWidthChild(window);
    } else {
      await window.close();
    }
  }
)
