import { defineStore } from 'pinia'

import { apis, Version, NewVersion } from '/@/lib/apis'

export const useLauncherStore = defineStore('launcher', {
  state: () => ({
    versions: new Map<string, Version>(),
    initialized: false
  }),
  getters: {
    getLauncherVersionById(state) {
      return (versionId: string) => state.versions.get(versionId)
    }
  },
  actions: {
    async initialize() {
      // TODO: argument order
      const { data } = await apis.getVersions()
      this.versions = new Map<string, Version>(data.map(v => [v.id, v]))
      this.initialized = true
    },
    async addVersion(version: NewVersion) {
      // TODO: response type
      const { data } = await apis.postVersion(version)
      this.versions.set(data.id, data)
    }
  }
})
