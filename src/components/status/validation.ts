import type { ModlistMetadata } from '@/types';

export type ValidationState = 'failing' | 'passing' | 'skipped';

/** Forced-down lists are not validated, so they count as skipped even if an old summary reports failures. */
export function getValidationState(modlist: ModlistMetadata): ValidationState {
  if (modlist.force_down) return 'skipped';
  if (modlist.validationSummary?.HasFailures) return 'failing';
  return 'passing';
}
