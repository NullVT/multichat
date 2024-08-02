/**
 * HTTP
 */
export type UsersResponse = {
  data: {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
  }[];
};

export type EventSubSubscriptionsResponse = {
  data: {
    id: string;
    status: string; // e.g., 'enabled', 'disabled'
    type: string; // Type of event, e.g., 'channel.subscribe'
    version: string; // Version of the subscription
    condition: {
      broadcaster_user_id: string;
      user_id: string;
    };
    transport: {
      method: string; // e.g., 'webhook'
      callback?: string; // URL where Twitch sends events
      secret?: string; // Secret used to verify webhook events
      session_id?: string;
    };
    created_at: string; // ISO 8601 timestamp
    cost: number; // Cost of the subscription, typically 0
  }[];
  total: number;
};

/**
 * Websocket
 */
export type TwitchWebsocketMessage =
  | SessionWelcomeMessage
  | KeepAliveMessage
  | ChatMessage;

type Metadata = {
  message_id: string;
  message_type: string;
  message_timestamp: string;
  subscription_type?: string;
  subscription_version?: string;
};

type Subscription = {
  id: string;
  status: string;
  type: string;
  version: string;
  condition: {
    broadcaster_user_id: string;
    user_id: string;
  };
  transport: {
    method: string; // e.g., 'websocket'
    session_id: string;
  };
  created_at: string; // ISO 8601 timestamp
  cost: number;
};

export type SessionWelcomeMessage = {
  metadata: Metadata & {
    message_type: "session_welcome";
  };
  payload: {
    session: {
      id: string;
      status: string;
      connected_at: string;
      keepalive_timeout_seconds: number;
      reconnect_url?: string | null;
      recovery_url?: string | null;
    };
  };
};

export type KeepAliveMessage = {
  metadata: Metadata & {
    message_type: "session_keepalive";
  };
  payload: {};
};

export type ChatMessage = {
  metadata: Metadata & {
    message_type: "notification";
    subscription_type: "channel.chat.message";
    subscription_version: "1";
  };
  payload: {
    subscription: Subscription;
    event: {
      broadcaster_user_id: string;
      broadcaster_user_login: string;
      broadcaster_user_name: string;
      chatter_user_id: string;
      chatter_user_login: string;
      chatter_user_name: string;
      message_id: string;
      message: {
        text: string;
        fragments: {
          type: string; // e.g., 'text'
          text: string;
          cheermote: null; // Replace with appropriate type if needed
          emote: null; // Replace with appropriate type if needed
          mention: null; // Replace with appropriate type if needed
        }[];
      };
      color: string; // e.g., '#8A2BE2'
      badges: {
        set_id: string;
        id: string;
        info: string;
      }[];
      message_type: string; // e.g., 'text'
      cheer: null; // Replace with appropriate type if needed
      reply: null; // Replace with appropriate type if needed
      channel_points_custom_reward_id: null; // Replace with appropriate type if needed
      channel_points_animation_id: null; // Replace with appropriate type if needed
    };
  };
};
