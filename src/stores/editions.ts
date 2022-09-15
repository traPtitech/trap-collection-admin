import { defineStore } from 'pinia'
import { ref } from 'vue'

import { withAuth } from '../utils/withAuth'
import { apis, Edition, NewEdition, PatchEdition } from '/@/lib/apis'

export const useEditionsStore = defineStore('Editions', () => {
  const Edition = ref<Map<string, Edition> | undefined>(undefined)

  // Edition を取得する
  const refetch = async () => {
    const res = await withAuth(apis.getEditions)()
    Edition.value = new Map<string, Edition>(res?.data.map(v => [v.id, v]))
  }

  // Edition を作成する
  const postEdition = async (Edition: NewEdition) => {
    await withAuth(apis.postEdition)(Edition)
    await refetch()
  }

  // Edition を削除する
  const deleteEditions = async (EditionId: string) => {
    await withAuth(apis.deleteEdition)(EditionId)
    await refetch()
  }

  // Edition を更新する
  const patchEdition = async (EditionId: string, Edition: PatchEdition) => {
    await withAuth(apis.patchEdition)(EditionId, Edition)
    await refetch()
  }

  return { Edition, refetch, postEdition, deleteEditions, patchEdition }
})
