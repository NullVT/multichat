export type Settings = {
  darkMode: boolean;
  sevenTv: boolean;
  timeout: number;
};

export type Credentials = {
  twitchError: boolean;
  twitch?: {
    token: string;
    userId: string;
    displayName: string;
    sessionId: string;
    chatSubscriptionId?: string;
  };
};

export type Message = {
  id: string;
  platform: "twitch" | "youtube";
  recivedAt: Date;
  from: {
    name: string;
    broadcaster?: boolean;
    moderator?: boolean;
    vip?: boolean;
  };
  body: string;
};
