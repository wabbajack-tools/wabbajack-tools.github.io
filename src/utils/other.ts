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
