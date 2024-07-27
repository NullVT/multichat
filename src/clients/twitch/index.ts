import { CredentialsStore } from "../../stores/credentials.vue";
import { MessagesStore } from "../../stores/messages.vue";
import onMessage from "./onMessage";

export * from "./oauth";

export const init = ({
  channel,
  credsStore,
  msgStore,
}: {
  channel: string;
  credsStore: CredentialsStore;
  msgStore: MessagesStore;
}): WebSocket => {
  const ws = new WebSocket("wss://irc-ws.chat.twitch.tv:443");
  const token = credsStore.twitch?.token;
  const username = credsStore.twitch?.username;

  // initialize connection to specific channel
  // TODO: see of this WS support joining multiple channels.
  ws.addEventListener("open", () => {
    console.info(`Connection to #${channel} as ${username ?? "ANONYMOUS"}`);

    // set auth
    if (token) ws.send(`PASS oauth:${token}`);
    if (username) ws.send(`NICK ${username}`);

    ws.send(`JOIN #${channel}`);
  });

  // handle message
  ws.addEventListener("message", onMessage(msgStore));

  // handle errors
  ws.addEventListener("error", (event: WebSocketEventMap["error"]) => {
    console.error("Twitch WS Error", event);
  });

  // handle close
  ws.addEventListener("close", (event: WebSocketEventMap["close"]) => {
    console.info("Twtich WS closed");
  });

  return ws;
};
