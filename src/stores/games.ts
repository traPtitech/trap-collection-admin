import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApi } from '../hooks/useApi'
import { apis, GameInfo, NewGame, PatchGame } from '/@/lib/apis'

export const useGamesStore = defineStore('games', () => {
  const games = ref<Map<string, GameInfo>>()
  const allGames = ref<Map<string, GameInfo>>()

  const getGamesApi = useApi(apis.getGames)
  const postGameApi = useApi(apis.postGame)
  const deleteGameApi = useApi(apis.deleteGame)
  const patchGameApi = useApi(apis.patchGame)

  // Game を取得する
  const refetch = async () => {
    const res = await getGamesApi.refetch(false)
    if (res?.type === 'success') {
      games.value = new Map(res.data.games.map(g => [g.id, g]))
    }
    const allRes = await getGamesApi.refetch(true)
    if (allRes?.type === 'success') {
      allGames.value = new Map(allRes.data.games.map(g => [g.id, g]))
    }
  }

  // データがないなら Game を取得する
  const getGames = async () => {
    if (games.value === undefined) {
      await refetch()
    }
  }

  // Game を作成する
  const postGame = async (game: NewGame) => {
    await postGameApi.refetch(game)
    await refetch()
  }

  // Game を削除する
  const deleteGames = async (gameId: string) => {
    await deleteGameApi.refetch(gameId)
    await refetch()
  }

  // Game を更新する
  const patchGame = async (gameId: string, game: PatchGame) => {
    await patchGameApi.refetch(gameId, game)
    await refetch()
  }

  return {
    games,
    allGames,
    refetch,
    getGames,
    postGame,
    deleteGames,
    patchGame
  }
})
