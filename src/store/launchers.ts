import { defineStore } from 'pinia'

import { apis, Version, NewVersion, VersionDetails } from '/@/lib/apis'

export const useLaunchersStore = defineStore('launchers', {
  state: () => ({
    versions: new Map<string, Version>(),
    currentVersion: undefined as VersionDetails | undefined,
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
      // TODO: responce order
      const latestVersionId = data.reverse()[0]?.id
      if (!latestVersionId) return
      this.currentVersion = (await apis.getVersion(latestVersionId)).data
      this.initialized = true
    },
    async addVersion(version: NewVersion) {
      // TODO: response type
      const { data } = await apis.postVersion(version)
      this.versions.set(data.id, data)
    }
  }
})
