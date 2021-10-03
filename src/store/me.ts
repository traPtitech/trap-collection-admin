import { defineStore } from 'pinia'

import { apis, User } from '/@/lib/apis'

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
    async fetchMe() {
      try {
        const { data: me } = await apis.getMe()
        this.me = me
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  }
})
