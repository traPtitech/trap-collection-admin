import axios from "axios";
import { Route } from "vue-router";

export const traQBaseURL = "https://q.trap.jp/api/v3";
axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000/api"
    : "https://trap-collection.trap.jp/api";

export async function redirect2AuthEndpoint() {
  interface OauthParams {
    clientId: string;
    state: string;
    codeChallenge: string;
    codeChallengeMethod: string;
  }

  const data: OauthParams = (await axios.post("/oauth/generate/code")).data;

  const authorizationEndpointUrl = new URL(`${traQBaseURL}/oauth2/authorize`);
  authorizationEndpointUrl.search = new URLSearchParams({
    responseType: "code",
    clientId: data.clientId,
    state: data.state,
    codeChallenge: data.codeChallenge,
    codeChallengeMethod: data.codeChallengeMethod
  }).toString();

  window.location.assign(authorizationEndpointUrl.toString());
}

export async function getRequest2Callback(to: Route) {
  return axios.get("/callback", {
    params: {
      code: to.query.code,
      state: to.query.state
    }
  });
}

interface Game {
  id: string;
  name: string;
  createdAt: string;
  version: GameVersion;
}

interface GameVersion {
  name: string;
  description: string;
  createdAt: string;
}

export async function getGames(all = false): Promise<Array<Game>> {
  return (await axios.get("/games", { params: { all } })).data;
}

interface LauncherVersion {
  id: string;
  name: string;
  games: string[];
  createdAt: string;
}

export async function getVersions(): Promise<Array<LauncherVersion>> {
  return (await axios.get("/versions")).data;
}

interface GameInfo {
  id: string;
  name: string;
  createdAt: string;
  version: GameLog;
}

export async function getGameInfo(id: string): Promise<GameInfo> {
  return (await axios.get(`/api/games/${id}/info`)).data;
}

interface GameLog {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export async function getGameLogs(id: string): Promise<Array<GameLog>> {
  return (await axios.get(`/api/games/version/${id}`)).data;
}
