import axios from 'axios'
import { Route } from 'vue-router'

export const traQBaseURL = 'https://q.trap.jp/api/1.0'
axios.defaults.baseURL = 'http://localhost:4000'

export async function redirect2AuthEndpoint() {

    interface OauthParams {
        clientId: string
        state: string
        codeChallenge: string
        codeChallengeMethod: string
    }

    const data: OauthParams = (await axios.post('/oauth/generate/code')).data

    const authorizationEndpointUrl = new URL(`${traQBaseURL}/oauth2/authorize`)
    authorizationEndpointUrl.search = new URLSearchParams({
        responseType: "code",
        clientId: data.clientId,
        state: data.state,
        codeChallenge: data.codeChallenge,
        codeChallengeMethod: data.codeChallengeMethod,
    }).toString()

    window.location.assign(authorizationEndpointUrl.toString())

}

export async function getRequest2Callback(to: Route) {
    return axios.get('/callback', { params: {
        code: to.query.code,
        state: to.query.state,
    } })
}

interface Games {
    games: Game[]
}

interface Game {
    id: string
    name: string
    createdAt: string
    version: GameVersion
}

interface GameVersion {
    name: string
    description: string
    createdAt: string
}

export async function getGames(all = false): Promise<Games> {
    return (await axios.get('/game', { params: { all } })).data
}

interface LauncherVersions {
    launcherVersions: LauncherVersion[]
}

interface LauncherVersion {
    id: string
    name: string
    games: string[]
    createdAt: string
}

export async function getVersions(): Promise<LauncherVersions> {
    return (await axios.get('/versions')).data
}

// TODO: any

export async function getGameInfo(id: string): Promise<any> {
    return (await axios.get(`/api/games/${id}/info`)).data
}

export async function getGameLogs(id: string): Promise<any> {
    return (await axios.get(`/api/games/version/${id}`)).data
}

export async function getImageURL(id: string): Promise<any> {
    return (await axios.get(`/api/games/${id}/iamge`)).data
}

export async function getVideoURL(id: string): Promise<any> {
    return (await axios.get(`/api/games/${id}/video`)).data
}
