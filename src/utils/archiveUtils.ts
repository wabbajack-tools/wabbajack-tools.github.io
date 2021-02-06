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

export const filterArchives = (
  archives: IArchive[],
  showNSFW: boolean,
  showGameFiles: boolean
) => {
  return archives.filter((a) => {
    //no need to filter if we show everything
    if (showNSFW && showGameFiles) return true;
    if (a.State.$type === 'LoversLabDownloader, Wabbajack.Lib') return showNSFW;
    if (a.State.$type === 'GameFileSourceDownloader, Wabbajack.Lib')
      return showGameFiles;

    const metaState = tryGetMetaState(a.State);
    if (metaState === undefined) return true;
    return !metaState.IsNSFW;
  });
};

export const renderName = (
  rowData: IArchive,
  renderMetaNames: boolean
): string => {
  return tryGetName(rowData, renderMetaNames);
};

export const sortName = (
  data1: IArchive,
  data2: IArchive,
  renderMetaNames: boolean
): number => {
  const name1 = tryGetName(data1, renderMetaNames);
  const name2 = tryGetName(data2, renderMetaNames);
  return name1.localeCompare(name2);
};

export const filterName = (
  filter: any,
  rowData: IArchive,
  renderMetaNames: boolean
): boolean => {
  const sFilter = filter as string;
  if (sFilter === undefined) return true;
  const name = tryGetName(rowData, renderMetaNames).toLocaleLowerCase();
  return name.includes(sFilter.toLocaleLowerCase());
};

export const renderType = (rowData: IArchive): string => {
  return rowData.State.$type.replace(', Wabbajack.Lib', '');
};

export const archiveLinkAction = (rowData: IArchive | IArchive[]) => {
  const archive = rowData as IArchive;
  if (archive === undefined) return;
  const url = tryGetURL(archive);
  if (url === undefined) return;
  window.open(url, '_blank');
};

export const archiveLinkActionDisabled = (rowData: IArchive): boolean => {
  const url = tryGetURL(rowData);
  return url === undefined;
};
