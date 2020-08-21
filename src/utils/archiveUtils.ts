import {
  IAbstractDownloadState,
  IMetaState,
  MetaStateType,
  IArchive,
} from '../types/archives';

export function tryGetMetaState(
  state: IAbstractDownloadState
): IMetaState | undefined {
  const type = state.$type;
  const metaType = type as MetaStateType;
  if (metaType === undefined) return undefined;
  const metaState = state as IMetaState;
  if (metaState === undefined) {
    console.log(`${state.$type} was supposed to be an IMetaState but is not!`);
    return undefined;
  }

  return metaState;
}

export function tryGetName(archive: IArchive): string {
  const metaState = tryGetMetaState(archive.State);
  if (metaState === undefined) return archive.Name;
  if (metaState.Name === undefined) return archive.Name;
  return metaState.Name;
}
