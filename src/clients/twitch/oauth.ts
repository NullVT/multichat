import config from "../../config";
import { CredentialsStore } from "../../stores/credentials.vue";
import { UsersResponse } from "../../types/twitch";

export const oauth = async (credStore: CredentialsStore) => {
  // extract params from url
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));

  // send error toast
  if (params.has("error")) {
    console.error(
      "twitch auth error",
      params.get("error"),
      params.get("error_description")
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
    if (!usersRes.ok) throw new Error("Failed to fetch Twitch user info");

    // unmarshal response
    const users: UsersResponse = await usersRes.json();
    console.log("users", JSON.stringify(users, null, 2));
    if (users.data?.length === 0) {
      throw new Error("Failed to fetch Twitch user info");
    }

    // persist creds to store
    credStore.$patch({
      twitchError: false,
      twitch: {
        token,
        userId: users.data[0].id,
        displayName: users.data[0].display_name,
      },
    });
  }

  // remove params from url
  window.location.replace(
    window.location.href.split("#")[0].replace(/\/oauth\/twitch$/, "")
  );
};

export const login = () => {
  const params = new URLSearchParams({
    response_type: "token",
    client_id: config.twitchClientId,
    redirect_uri: `${window.location.origin}/oauth/twitch`,
    scope: ["user:bot", "user:read:chat", "user:write:chat"].join(" "),
  });
  const url = `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
  window.location.assign(url);
};

export const validateToken = async (token: string): Promise<boolean> => {
  const res = await fetch("https://id.twitch.tv/oauth2/validate", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.status === 200;
};
