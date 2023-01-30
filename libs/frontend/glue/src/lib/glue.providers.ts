import { importProvidersFrom } from '@angular/core';
import { Glue42Ng } from '@glue42/ng';
import { Glue42NgSettings } from '@glue42/ng/dist/lib/types';
import GlueDesktop from '@glue42/desktop';
const defaultSettings: Glue42NgSettings = {
  desktop: {
    factory: GlueDesktop,
    config: {
      appManager: 'full',
      layouts: 'full',
      channels: true,
      windows: true,
      displays: true,
    },
  },
};
export function getGlueProviders(settings?: Glue42NgSettings) {
  return importProvidersFrom(Glue42Ng.forRoot(settings || defaultSettings));
}
