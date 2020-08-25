export const DateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

export const getDateString = (
  date: Date,
  local?: string | undefined
): string => {
  const dateString = Intl.DateTimeFormat(
    local ? local : 'default',
    DateTimeFormatOptions
  ).format(date);
  return dateString;
};

export const getGitHubLinkFromRaw = (rawURL: string): string | undefined => {
  if (!rawURL.startsWith('https://raw.githubusercontent.com')) return undefined;
  const base = rawURL.replace('https://raw.githubusercontent.com/', '');
  const split = base.split('/');
  const url = `https://github.com/${split[0]}/${split[1]}/blob/${split[2]}/`;

  return url;
};

export const randomString = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result = result.concat(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result;
};

const Suffix = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

export const toFileSizeString = (size: number) => {
  if (size === 0) return `${size}${Suffix[0]}`;
  const bytes = Math.abs(size);
  const place = Math.floor(Math.log(bytes) / Math.log(1024));
  const num = Math.round(bytes / Math.pow(1024, place));
  return Math.sign(size) * num + Suffix[place];
};

export const createNexusURL = (game: string, id: string | number) => {
  return `https://www.nexusmods.com/${game.toLowerCase()}/mods/${id}`;
};

export function notUndefined<T>(arr: Array<T | undefined>): Array<T> {
  return arr.filter((x) => x !== undefined) as Array<T>;
};
