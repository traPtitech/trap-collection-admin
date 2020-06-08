<template>
  <v-card class="mx-auto" tile min-height="100%">
    <v-list :flat="flat">
      <v-subheader>LauncherVersions</v-subheader>
      <v-list-item>
        <!-- バージョン追加ボタン -->
        <v-btn
          class="mx-2"
          fab
          x-small
          depressed
          justify="center"
          to="/versions/new"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        Release new launcher version
      </v-list-item>
      <!-- バージョンリスト -->
      <v-list-group
        v-for="version in versions"
        :key="version.id"
        v-model="version.active"
        color="primary"
      >
        <template v-slot:activator>
          <v-list-item-content style="margin-left: 15px;">
            <v-list-item-title class="headline mb-1">
              {{ version.id }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ version.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <v-list-item v-for="game in version.games" :key="game">
          <v-list-item-content style="margin-left: 20px;">
            <v-list-item-title v-text="game"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import { getVersions } from "@/utils/api.ts";

export default {
  name: "Versions",
  mounted() {
    this.mount();
  },
  methods: {
    async mount() {
      this.versions = getVersions().launcherVersions;
      for (const version of this.versions) {
        version.active = false;
      }
    }
  }
};
</script>
