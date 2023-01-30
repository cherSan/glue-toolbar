import { GlueService } from '@launchpad/frontend/glue';
import { firstValueFrom } from 'rxjs';

export function applicationEnvironmentInitialize(
  glueService: GlueService
): () => Promise<boolean> {
  return () => firstValueFrom(glueService.initialize()).then(() => true);
}
