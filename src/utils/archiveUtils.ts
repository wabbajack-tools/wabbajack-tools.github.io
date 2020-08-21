import {
  IAbstractDownloadState,
  IMetaState,
  MetaStateType,
  IArchive,
  INexusDownloaderState,
  IURLState,
} from '../types/archives';
import { createNexusURL } from './other';

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

export function tryGetName(archive: IArchive, useMetaName: boolean): string {
  if (!useMetaName) return archive.Name;
  const metaState = tryGetMetaState(archive.State);
  if (metaState === undefined) return archive.Name;
  if (metaState.Name === undefined || metaState.Name === null)
    return archive.Name;
  return metaState.Name;
}

export function tryGetURL(archive: IArchive): string | undefined {
  const urlState = archive.State as IURLState;
  if (urlState !== undefined) {
    if (urlState.URL !== undefined && urlState.URL !== null)
      return urlState.URL;
    if (urlState.Url !== undefined && urlState.Url !== null)
      return urlState.Url;
  }

  const nexusState = archive.State as INexusDownloaderState;
  if (nexusState === undefined) return undefined;
  if (nexusState.$type !== 'NexusDownloader, Wabbajack.Lib') return undefined;
  return createNexusURL(nexusState.GameName, nexusState.ModID);
}
