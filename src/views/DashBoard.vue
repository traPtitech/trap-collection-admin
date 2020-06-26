<template>
  <v-container id="gamelist" fluid tag="section" min-height="100%">
    <v-row justify="start">
      <!-- ゲーム追加ボタン -->
      <v-col>
        <v-card flat class="button-wrapper">
          <v-btn fab x-large to="/games/new">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card>
      </v-col>
      <!-- ゲームリスト -->
      <div v-for="game in games" :key="game.id">
        <v-col>
          <game-panel :game="game" />
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { getGames } from "@/utils/api";

export default {
  name: "GameList",
  data() {
    return {
      games: []
    };
  },
  components: {
    GamePanel: () => import("@/components/GamePanel.vue")
  },
  async mounted() {
    await this.mount();
  },
  methods: {
    async mount() {
      const all = true;
      this.games = await getGames(all);
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  border: 2px solid red;
}
.button_wrapper {
  align-items: center;
  justify-content: center;
}
</style>
