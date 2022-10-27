import { TreeSelectOption } from 'naive-ui'
import { computed, ComputedRef, reactive } from 'vue'

import { apis } from '../lib/apis'
import { useGamesStore } from '../stores/games'
import { useApi } from './useApi'

export const useGameVersionTreeSelectProps = (): {
  options: ComputedRef<TreeSelectOption[]>
  handleLoad: (option: TreeSelectOption) => Promise<void>
} => {
  const gamesStore = useGamesStore()
  const options = computed(() => {
    const entries = gamesStore.allGames?.entries()
    if (entries === undefined) return []
    return Array.from(entries).map(([, game]) =>
      reactive({
        disabled: true,
        label: game.name,
        key: game.id,
        depth: 1,
        isLeaf: false
      })
    )
  })
  const handleLoad = async (option: TreeSelectOption): Promise<void> => {
    const getGameVersion = useApi(apis.getGameVersion)
    const res = await getGameVersion.refetch(String(option.key))
    if (res?.type === 'error' || res === undefined) return
    option.children = res.data.versions.map(version => ({
      label: version.name,
      key: version.id,
      depth: 2,
      isLeaf: true
    }))
  }
  return {
    options,
    handleLoad
  }
}
