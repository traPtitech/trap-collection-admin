import { defineStore } from 'pinia'

import { User } from '/@/lib/apis'

export const useMeStore = defineStore('me', {
  state: () => ({
    me: undefined as User | undefined
  }),
  getters: {
    isLoggedIn(state) {
      return state.me !== undefined
    }
  },
  actions: {
    setMe(me: User) {
      this.me = me
    }
  }
})
