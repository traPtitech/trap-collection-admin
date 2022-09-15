import { defineStore } from 'pinia'
import { ref } from 'vue'

import { withAuth } from '../utils/withAuth'
import { apis, User } from '/@/lib/apis'

export const useMeStore = defineStore('me', () => {
  const me = ref<User | undefined>(undefined)

  // Me を取得する
  const refetch = async () => {
    const res = await withAuth(apis.getMe)()
    me.value = res?.data
  }

  return { me, refetch }
})
