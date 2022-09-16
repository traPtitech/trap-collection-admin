import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApi } from '../hooks/useApi'
import { paths } from '../utils/paths'
import { apis, User } from '/@/lib/apis'

export const useMeStore = defineStore('me', () => {
  const me = ref<User>()

  const getMeApi = useApi(apis.getMe)

  // Me を取得する
  const refetch = async () => {
    const res = await getMeApi.refetch()
    if (res?.type === 'success') {
      me.value = res.data
    }
  }

  const logout = async () => {
    await apis.postLogout()
    window.location.href = paths.oauthEntrypointPath
    return
  }

  return { me, refetch, logout }
})
