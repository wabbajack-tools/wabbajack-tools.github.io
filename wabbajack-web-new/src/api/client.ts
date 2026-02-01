import { API_BASE_URL } from '@/lib/constants';

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.text();
}

export function buildApiUrl(path: string): string {
  return `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
