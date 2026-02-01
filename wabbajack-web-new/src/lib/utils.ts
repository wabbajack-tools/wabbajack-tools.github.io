import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function canRenderReadme(readmeUrl: string | undefined): boolean {
  if (!readmeUrl) return false;

  // Check if it's a raw GitHub content URL that we can fetch and render
  const renderablePatterns = [
    'raw.githubusercontent.com',
    'raw.github.com',
  ];

  return renderablePatterns.some(pattern => readmeUrl.includes(pattern));
}

export function isValidDiscordUrl(url: string | undefined): boolean {
  if (!url) return false;

  const discordRegex = /^(https?:\/\/)?(www\.)?(discord\.(gg|com|io|me|li)|discordapp\.com\/invite)\/.+$/i;
  return discordRegex.test(url);
}
