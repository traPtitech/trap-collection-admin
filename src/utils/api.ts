import axios from 'axios'
import { Route } from 'vue-router'

export const traQBaseURL = 'https://q.trap.jp/api/1.0'
axios.defaults.baseURL = 'https://trap-collection.trap.jp'

export async function redirect2AuthEndpoint() {

    interface OauthParams {
        clientId: string
        state: string
        codeChallenge: string
        codeChallengeMethod: string
    }

    const data: OauthParams = (await axios.get('/oauth2/params')).data

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
    version: Version
}

interface Version {
    name: string
    description: string
    createdAt: string
}

export async function getGames(all = false): Promise<Games> {
    return (await axios.get('/game', { params: { all } })).data
}