import { createFileRoute, redirect } from '@tanstack/react-router';
import { DISCORD_INVITE_URL } from '@/lib/constants';

export const Route = createFileRoute('/discord')({
  beforeLoad: () => {
    // Redirect to Discord invite
    window.location.href = DISCORD_INVITE_URL;
    throw redirect({ to: '/' }); // Fallback in case window.location doesn't work
  },
  component: () => null,
});
