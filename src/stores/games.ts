import { defineStore } from 'pinia'
import { ref } from 'vue'

import { withAuth } from '../utils/withAuth'
import { apis, GameInfo, NewGame, PatchGame } from '/@/lib/apis'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Map<string, GameInfo> | undefined>(undefined)

  // Game を取得する
  const refetch = async () => {
    const res = await withAuth(apis.getGames)()
    games.value = new Map<string, GameInfo>(res?.data.games.map(v => [v.id, v]))
  }

  // Game を作成する
  const postGame = async (game: NewGame) => {
    await withAuth(apis.postGame)(game)
    await refetch()
  }

  // Game を削除する
  const deleteGames = async (gameId: string) => {
    await withAuth(apis.deleteGame)(gameId)
    await refetch()
  }

  // Game を更新する
  const patchGame = async (gameId: string, game: PatchGame) => {
    await withAuth(apis.patchGame)(gameId, game)
    await refetch()
  }

  return { games, refetch, postGame, deleteGames, patchGame }
})
