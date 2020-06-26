<template>
  <div v-if="game" class="d-flex flex-wrap">
    <v-container>
      <v-row>
        <v-col :cols="12" :sm="8" :lg="9" :xl="10">
          <h1>{{ game.name }}</h1>
          <div class="mb-8">
            <h2>
              {{ game.version.name }}
              <AddVersion @reloadGame="reloadGame" />
            </h2>
          </div>
          <div class="mb-8">
            <div>ゲーム説明文</div>
            {{ game.description }}
            <EditDescription :propGame="game" @reloadGame="reloadGame" />
          </div>
          <v-row>
            <v-col>
              <div class="mb-4 cover-container">
                <div>ゲームイメージ</div>
                <label class="input-item__label">
                  <input type="file" @change="onImgFileChange" />
                </label>
                <v-img
                  v-if="!loading && imgURL.length"
                  :src="imgURL"
                  height="180"
                  width="260"
                />
              </div>
            </v-col>
            <v-col>
              <div class="mb-4 cover-container">
                <div>ゲーム動画</div>
                <label class="input-item__label">
                  <input type="file" @change="onMovieFileChange" />
                </label>
                <video
                  class="cover"
                  src="videoURL.length ? videoURL : '/img/no-movie.svg'"
                />
              </div>
            </v-col>
          </v-row>
          <div class="mb-8">
            <div>
              <h2>Releases</h2>
              <div v-if="logs.length">
                <div v-for="log in logs" :key="log.id">
                  {{ getVersions(log) }}
                </div>
              </div>
              <div v-else>
                まだリリースされていません
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import AddVersion from "src/components/AddVersion";
import EditDescription from "src/components/EditDescription";
import { getGameInfo, getGameLogs } from "src/utils/api";

export default {
  name: "GameDetails",
  components: {
    AddVersion,
    EditDescription
  },
  data() {
    return {
      game: null,
      imgURL: `${axios.defaults.baseURL}/games/${this.game.id}/image`,
      videoURL: `${axios.defaults.baseURL}/games/${this.game.id}/video`,
      logs: []
    };
  },
  created() {
    try {
      Promise.all([
        getGameInfo(this.$route.params.id).then(res => (this.game = res.game)),
        getGameLogs(this.$route.params.id).then(res => (this.logs = res.logs))
      ]);
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    reloadGame() {
      getGameInfo(this.$route.params.id).then(res => (this.game = res.game));
    },
    onImgFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    async createImage(file) {
      const form = new FormData();
      form.enctype = "multipart/form-data";
      form.append("file", file);
      const game = await axios
        .post(`/api/games/${this.$route.params.id}/image`, form)
        .catch(e => alert(e));

      this.imgURL = game.URL;
    },
    onMovieFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createMovie(files[0]);
    },
    async createMovie(file) {
      const form = new FormData();
      form.enctype = "multipart/form-data";
      form.append("file", file);
      const game = await axios
        .post(`/api/games/${this.$route.params.id}/video`, form)
        .catch(e => alert(e));

      this.videoURL = game.URL;
    },
    getVersions(log) {
      const versionName = log.name;
      const versionDescription = log.description;
      const createdTime = log.createdAt;
      return `version${versionName}: ${versionDescription} - ${createdTime}`;
    }
  }
};
</script>

<style scoped>
.cover {
  width: 100%;
}
.cover-container {
  display: flex;
  justify-content: center;
}
</style>
