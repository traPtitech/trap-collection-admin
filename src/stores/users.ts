import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApi } from '../hooks/useApi'
import { apis, User } from '/@/lib/apis'

export const useUsersStore = defineStore('users', () => {
  const users = ref<Map<string, User>>()

  const getUsersApi = useApi(apis.getUsers)

  // Users を取得する
  const refetch = async () => {
    const res = await getUsersApi.refetch()
    if (res?.type === 'success') {
      users.value = new Map(res.data.map(u => [u.id, u]))
    }
  }

  // Users がないなら Users を取得する
  const getUsers = async () => {
    if (users.value === undefined) {
      await refetch()
    }
  }

  return { users, refetch, getUsers }
})
