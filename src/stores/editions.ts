import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApi } from '../hooks/useApi'
import { apis, Edition, NewEdition, PatchEdition } from '/@/lib/apis'

export const useEditionsStore = defineStore('Editions', () => {
  const editions = ref<Map<string, Edition>>()

  const getEditionsApi = useApi(apis.getEditions)
  const postEditionApi = useApi(apis.postEdition)
  const deleteEditionApi = useApi(apis.deleteEdition)
  const patchEditionApi = useApi(apis.patchEdition)

  // Edition を取得する
  const refetch = async () => {
    const res = await getEditionsApi.refetch()
    if (res?.type === 'success') {
      editions.value = new Map(res.data.map(g => [g.id, g]))
    }
  }

  // データがないなら Edition を取得する
  const getEditions = async () => {
    if (editions.value === undefined) {
      await refetch()
    }
  }

  // Edition を作成する
  const postEdition = async (edition: NewEdition) => {
    await postEditionApi.refetch(edition)
    await refetch()
  }

  // Edition を削除する
  const deleteEditions = async (editionId: string) => {
    await deleteEditionApi.refetch(editionId)
    await refetch()
  }

  // Edition を更新する
  const patchEdition = async (editionId: string, edition: PatchEdition) => {
    await patchEditionApi.refetch(editionId, edition)
    await refetch()
  }

  return {
    editions,
    refetch,
    getEditions,
    postEdition,
    deleteEditions,
    patchEdition
  }
})
