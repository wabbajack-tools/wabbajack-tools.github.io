export interface DiscordInvite {
  code: string;
  guild: {
    id: string;
    name: string;
  };
  channel: {
    id: string;
    name: string;
    type: number;
  };
};
