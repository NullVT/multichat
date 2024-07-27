import config from "../../config";
import { CredentialsStore } from "../../stores/credentials.vue";

export const oauth = async (credStore: CredentialsStore) => {
  // extract params from url
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  // send error toast
  if (params.has("error")) {
    console.error(
      "twitch auth error",
      params.get("error"),
      params.get("error_description"),
    );
  }

  // persist auth token
  if (!params.has("error") && params.has("access_token")) {
    const token = params.get("access_token")!;

    // get the users nickname
    const usersRes = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": config.twitchClientId,
      },
    });
    // TODO: graceful error handling
    if (!usersRes.ok) throw new Error("Failed to get Twitch Username");
    const users = await usersRes.json();
    let username;
    if (users.data?.length > 0) {
      const { login } = users.data[0];
      username = login;
    }

    // persist creds to store
    credStore.$patch({
      twitch: {
        token,
        username,
      },
    });
  }

  // remove params from url
  window.location.replace(
    window.location.href.split("#")[0].replace(/\/oauth\/twitch$/, ""),
  );
};

export const login = () => {
  const params = new URLSearchParams({
    response_type: "token",
    client_id: config.twitchClientId,
    redirect_uri: `${window.location.origin}/oauth/twitch`,
    scope: ["chat:read", "user:read:chat", "user:read:email"].join(" "),
  });
  const url = `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
  window.location.assign(url);
};
