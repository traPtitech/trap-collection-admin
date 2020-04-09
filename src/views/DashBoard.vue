<template>
  <v-container id="gamelist" fluid tag="section" min-height="100%">
    <v-row justify="start">
      <!-- ゲーム追加ボタン -->
      <v-col cols="auto">
        <v-card max-width="344" class="mx-auto" height="301" width="260" flat>
          <v-container fill-height>
            <v-row align="center" justify="center">
              <v-btn class="mx-2" fab x-large to="/games/new">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <!-- ゲームリスト -->
      <div v-for="game in games" :key="game.id">
        <v-col cols="auto">
          <game-panel :game="game" :baseURL="axios.default.baseURL" />
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { getGames } from "@/utils/api.ts";

export default {
  name: "GameList",
  components: {
    GamePanel: () => import("@/components/GamePanel.vue")
  },
  mounted() {
    this.mount();
  },
  methods: {
    async mount() {
      const all = true;
      this.games = getGames(all).games;
    }
  }
};
</script>
