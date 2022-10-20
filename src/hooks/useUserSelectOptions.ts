import { computed } from 'vue'

import { useUsersStore } from '../stores/users'

export const useUserSelectOptions = () => {
  const usersStore = useUsersStore()
  return computed(() => {
    const entries = usersStore.users?.entries()
    if (entries === undefined) return []
    return Array.from(entries).map(([id, user]) => ({
      label: user.name,
      value: id
    }))
  })
}
