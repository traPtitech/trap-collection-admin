<template>
  <v-container id="gamelist" fluid tag="section">
    <div v-if="games !== null">
      <v-for>
        <v-row justify="start">
          <div v-for="game in games" :key="game.id">
            <v-col cols="auto">
              <game-panel :game="game"></game-panel>
            </v-col>
          </div>
        </v-row>
      </v-for>
    </div>
    <div v-else>読み込み中...</div>
  </v-container>
</template>

<script>
// import { getGames } from "@/utils/api.ts";

export default {
  name: "GameList",
  components: {
    GamePanel: () => import("@/components/GamePanel.vue")
  },
  data() {
    return {
      games: [
        {
          id: 180,
          name: "traPCollection",
          createdAt: "2020/4/1",
          version: {
            name: "v0.1.0",
            description: "traPCollection",
            createdAt: "2020"
          }
        },
        {
          id: 181,
          name: "traPCollection真",
          createdAt: "2020/4/1",
          version: {
            name: "v0.1.0",
            description: "traPCollection",
            createdAt: "2020"
          }
        },
        {
          id: 181,
          name: "traPCollection真",
          createdAt: "2020/4/1",
          version: {
            name: "v0.1.0",
            description: "traPCollection",
            createdAt: "2020"
          }
        },
        {
          id: 182,
          name: "traPCollection真",
          createdAt: "2020/4/1",
          version: {
            name: "v0.1.0",
            description: "traPCollection",
            createdAt: "2020"
          }
        },
        {
          id: 183,
          name: "traPCollection真",
          createdAt: "2020/4/1",
          version: {
            name: "v0.1.0",
            description: "traPCollection",
            createdAt: "2020"
          }
        }
      ]
    };
  }
  // mounted() {
  //   this.mount();
  // },
  // methods: {
  //   async mount() {
  //     const all = true;
  //     this.games = getGames(all).games;
  //   }
  // }
};
</script>
