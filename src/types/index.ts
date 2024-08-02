export type Settings = {
  darkMode: boolean;
  sevenTv: boolean;
  timeout: number;
};

export type Credentials = {
  twitch?: {
    token: string;
    username?: string;
  };
};

export type Message = {
  id: string;
  platform: "twitch" | "youtube";
  recivedAt: Date;
  from: string;
  body: string;
};
