import { v4 as uuidV4 } from "uuid";
import { MessagesStore } from "../../stores/messages.vue";

type ParsedMessage = {
  tags: { [key: string]: any } | null;
  source: Source | null;
  command: Command | null;
  parameters: string | null;
};

type Source = {
  nick: string | null;
  host: string;
};

type Command = {
  command: string;
  channel?: string;
  isCapRequestEnabled?: boolean;
  botCommand?: string;
  botCommandParams?: string;
};

const parseMessage = (message: string): ParsedMessage | null => {
  const {
    rawTagsComponent,
    rawSourceComponent,
    rawCommandComponent,
    rawParametersComponent,
  } = extractComponents(message);

  const command = parseCommand(rawCommandComponent);

  if (command === null) {
    return null;
  }

  const tags = rawTagsComponent ? parseTags(rawTagsComponent) : null;
  const source = parseSource(rawSourceComponent);
  const parameters = rawParametersComponent;

  const finalCommand =
    rawParametersComponent && rawParametersComponent[0] === "!"
      ? parseParameters(rawParametersComponent, command)
      : command;

  return {
    tags,
    source,
    command: finalCommand,
    parameters,
  };
};

const extractComponents = (message: string) => {
  let idx = 0;

  const extract = (condition: boolean, start: number, end: number) => {
    if (condition) {
      const component = message.slice(start, end);
      idx = end + 1;
      return component;
    }
    return null;
  };

  const rawTagsComponent = extract(
    message[idx] === "@",
    1,
    message.indexOf(" ")
  );
  const rawSourceComponent = extract(
    message[idx] === ":",
    idx + 1,
    message.indexOf(" ", idx)
  );
  const rawCommandComponent = message
    .slice(
      idx,
      message.indexOf(":", idx) === -1
        ? message.length
        : message.indexOf(":", idx)
    )
    .trim();
  const rawParametersComponent =
    message.indexOf(":", idx) !== -1
      ? message.slice(message.indexOf(":", idx) + 1)
      : null;

  return {
    rawTagsComponent,
    rawSourceComponent,
    rawCommandComponent,
    rawParametersComponent,
  };
};

const parseTags = (tags: string): { [key: string]: any } => {
  const tagsToIgnore = new Set(["client-nonce", "flags"]);

  return tags.split(";").reduce(
    (acc, tag) => {
      const [key, value] = tag.split("=");
      const tagValue = value === "" ? null : value;

      if (tagsToIgnore.has(key)) {
        return acc;
      }

      const parseValue = (parseFunc: (value: string) => any) =>
        tagValue ? parseFunc(tagValue) : null;

      switch (key) {
        case "badges":
        case "badge-info":
          acc[key] = parseValue((v) =>
            v.split(",").reduce(
              (badgeAcc, pair) => {
                const [badgeKey, badgeValue] = pair.split("/");
                badgeAcc[badgeKey] = badgeValue;
                return badgeAcc;
              },
              {} as { [key: string]: string }
            )
          );
          break;

        case "emotes":
          acc[key] = parseValue((v) =>
            v.split("/").reduce(
              (emoteAcc, emote) => {
                const [emoteKey, positions] = emote.split(":");
                emoteAcc[emoteKey] = positions.split(",").map((position) => {
                  const [start, end] = position.split("-");
                  return { startPosition: start, endPosition: end };
                });
                return emoteAcc;
              },
              {} as {
                [key: string]: { startPosition: string; endPosition: string }[];
              }
            )
          );
          break;
        case "emote-sets":
          acc[key] = parseValue((v) => v.split(","));
          break;
        default:
          acc[key] = tagValue;
      }

      return acc;
    },
    {} as { [key: string]: any }
  );
};

const parseCommand = (rawCommandComponent: string): Command | null => {
  const commandParts = rawCommandComponent.split(" ");
  const command = commandParts[0];

  switch (command) {
    case "JOIN":
    case "PART":
    case "NOTICE":
    case "CLEARCHAT":
    case "HOSTTARGET":
    case "PRIVMSG":
    case "USERSTATE":
    case "ROOMSTATE":
      return { command, channel: commandParts[1] };
    case "PING":
    case "GLOBALUSERSTATE":
    case "RECONNECT":
      return { command };
    case "CAP":
      return { command, isCapRequestEnabled: commandParts[2] === "ACK" };
    case "001":
      return { command, channel: commandParts[1] };
    case "421":
      console.log(`Unsupported IRC command: ${commandParts[2]}`);
      return null;
    case "002":
    case "003":
    case "004":
    case "353":
    case "366":
    case "372":
    case "375":
    case "376":
      console.log(`numeric message: ${command}`);
      return null;
    default:
      console.log(`\nUnexpected command: ${command}\n`);
      return null;
  }
};

const parseSource = (rawSourceComponent: string | null): Source | null => {
  if (!rawSourceComponent) return null;

  const sourceParts = rawSourceComponent.split("!");
  return {
    nick: sourceParts.length === 2 ? sourceParts[0] : null,
    host: sourceParts.length === 2 ? sourceParts[1] : sourceParts[0],
  };
};

const parseParameters = (
  rawParametersComponent: string,
  command: Command
): Command => {
  const commandParts = rawParametersComponent.slice(1).trim();
  const paramsIdx = commandParts.indexOf(" ");

  return {
    ...command,
    botCommand:
      paramsIdx === -1 ? commandParts : commandParts.slice(0, paramsIdx),
    botCommandParams:
      paramsIdx === -1 ? undefined : commandParts.slice(paramsIdx).trim(),
  };
};

export default (msgStore: MessagesStore) =>
  (event: WebSocketEventMap["message"]) => {
    const message = parseMessage(event.data);

    if (message?.command?.command === "PRIVMSG") {
      msgStore.push({
        // TODO: investigate using a hash-based ID
        id: uuidV4(),
        platform: "twitch",
        recivedAt: new Date(),
        from: message.source?.nick!,
        body: message.parameters!.trim(),
      });
    } else {
      console.log("Non-message event", message);
    }
  };
