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
