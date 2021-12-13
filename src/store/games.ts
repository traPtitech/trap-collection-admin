import { defineStore } from 'pinia'

import { apis, Game } from '/@/lib/apis'

export const useGamesStore = defineStore('games', {
  state: () => ({
    games: new Map<string, Game>(),
    initialized: false
  }),
  getters: {
    getGameById(state) {
      return (gameId: string) => state.games.get(gameId)
    }
  },
  actions: {
    async initialize() {
      // TODO: argument order
      const { data } = await apis.getGames(true)
      this.games = new Map<string, Game>(data.map(game => [game.id, game]))
      this.initialized = true
    },
    async addGame(game: { name: string; description: string }) {
      // TODO: argument order
      const session = document.cookie
        .split('; ')
        .find(c => c.startsWith('session='))
        ?.split('=')[1]
      // TODO: response type
      const { data: data1 } = await apis.postGame(session, game)
      const { data: data2 } = await apis.getGame(data1.id)
      this.games.set(data1.id, data2)
    },
    async updateGame(gameId: string, name: string, description: string) {
      const { data } = await apis.putGame(gameId, { name, description })
      this.games.set(gameId, Object.assign(this.games.get(gameId), data))
    },
    async deleteGame(gameId: string) {
      await apis.deleteGames(gameId)
      this.games.delete(gameId)
    }
  }
})
