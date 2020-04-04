<template>
  <v-container id="gamelist" fluid tag="section" min-height="100%">
    <v-row justify="start">
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
      <div v-for="game in games" :key="game.id">
        <v-col cols="auto">
          <game-panel
            :game="game"
            :baseURL="axios.default.baseURL"
          ></game-panel>
        </v-col>
      </div>
    </v-row>
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
