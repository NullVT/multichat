import config from "../../config";
import { CredentialsStore } from "../../stores/credentials";
import { MessagesStore } from "../../stores/messages";
import { Credentials } from "../../types";
import {
  ChatMessage,
  EventSubSubscriptionsResponse,
  SessionWelcomeMessage,
  TwitchWebsocketMessage,
} from "../../types/twitch";

export * from "./oauth";

const subscribeToChat = async (
  creds: Credentials["twitch"]
): Promise<string | undefined> => {
  if (!creds) {
    throw new Error("Cannot subscribe to Twitch event with invalid creds");
  }

  const res = await fetch(
    "https://api.twitch.tv/helix/eventsub/subscriptions",
    {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${creds.token}`,
        "Client-Id": config.twitchClientId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "channel.chat.message",
        version: "1",
        condition: {
          user_id: creds.userId,
          broadcaster_user_id: creds.userId,
        },
        transport: {
          method: "websocket",
          session_id: creds.sessionId,
        },
      }),
    }
  );

  if (res.status != 202) {
    console.error(`Twitch message subscription failed ${res.status}`);
    console.error(await res.json());
    return;
  }

  const subscriptions: EventSubSubscriptionsResponse = await res.json();

  // check that the transport and condition match, then return the id
  return subscriptions.data.find(
    (sub) =>
      sub.transport.method === "websocket" &&
      sub.transport.session_id === creds.sessionId &&
      sub.condition.broadcaster_user_id === creds.userId &&
      sub.condition.user_id === creds.userId
  )?.id;
};

export const init = (
  credsStore: CredentialsStore,
  msgStore: MessagesStore
): void => {
  const ws = new WebSocket("wss://eventsub.wss.twitch.tv/ws");
  const creds = credsStore.twitch;
  if (!creds) {
    throw new Error("Cannot init Twtich connection with invalid credentials");
  }

  // check auth token
  // const tokenValid = await validateToken(credsStore.twitch!.token);
  // if (!tokenValid) {
  //   credsStore.$patch({
  //     twitch: undefined,
  //     twitchError: true,
  //   });
  //   return;
  // }

  // handle message
  ws.addEventListener(
    "message",
    async (event: WebSocketEventMap["message"]) => {
      const data: TwitchWebsocketMessage = JSON.parse(event.data);
      const msgType = data.metadata.message_type;
      const subType = data.metadata.subscription_type;

      switch (true) {
        // initial message
        case msgType === "session_welcome":
          const sessionMessage = data as SessionWelcomeMessage;
          credsStore.$patch({
            twitch: { sessionId: sessionMessage.payload.session!.id },
          });

          // TODO: store in session storage
          const chatSubscriptionId = await subscribeToChat(credsStore.twitch);
          credsStore.$patch({ twitch: { chatSubscriptionId } });
          break;

        // chat message
        case msgType === "notification" && subType === "channel.chat.message":
          const chatMessage = data as ChatMessage;
          msgStore.add({
            platform: "twitch",
            id: chatMessage.payload.event.message_id,
            recivedAt: new Date(data.metadata.message_timestamp),
            body: chatMessage.payload.event.message.text,
            from: {
              name: chatMessage.payload.event.chatter_user_name,
              broadcaster: !!chatMessage.payload.event.badges.find(
                (badge) => badge.set_id === "broadcaster"
              ),
              moderator: !!chatMessage.payload.event.badges.find(
                (badge) => badge.set_id === "moderator"
              ),
              vip: !!chatMessage.payload.event.badges.find(
                (badge) => badge.set_id === "vip"
              ),
            },
          });
      }
    }
  );

  // handle errors
  ws.addEventListener("error", (event: WebSocketEventMap["error"]) => {
    console.error("Twitch WS Error", event);
  });

  // handle close
  ws.addEventListener("close", (event: WebSocketEventMap["close"]) => {
    console.info("Twich WS closed", event);
  });

  // handle auth removed
  credsStore.$subscribe(() => {
    if (!credsStore.twitch) {
      console.warn("Twitch creds revoked, closing WS");
      ws.close();
    }
  });
};
