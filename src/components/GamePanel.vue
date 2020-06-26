<template>
  <v-card max-width="344" class="mx-auto" :to="{ path: '/game' + game.id }">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ game.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ game.version.name }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="`${baseURL}/game/${game.id}/image`"
      height="180"
      width="260"
    ></v-img>

    <v-card-text>
      {{ game.version.description }}
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "GamePanel",
  data() {
    return {
      baseURL: axios.defaults.baseURL
    };
  },
  props: {
    game: {
      id: String,
      name: String,
      createdAt: String,
      version: {
        name: String,
        description: String,
        createdAt: String
      }
    }
  }
};
</script>
