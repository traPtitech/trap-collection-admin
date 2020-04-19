<template>
  <div v-if="game" class="d-flex flex-wrap">
    <v-container>
      <v-row>
        <v-col :cols="12" :sm="8" :lg="9" :xl="10">
          <h1>{{ game.name }}</h1>
          <div class="mb-8">
            <h2>
              {{ game.version.name }}
              <EditVersion @reloadGame="reloadGame" />
            </h2>
          </div>
          <div class="mb-8">
            <div>ゲーム説明文</div>
            {{ game.version.description }}
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
                  v-if="!loading && imgUrl.length"
                  :src="imgUrl"
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
                  src="videoUrl.length ? videoUrl : '/img/no-movie.svg'"
                />
              </div>
            </v-col>
          </v-row>
          <div class="mb-8">
            <div>
              <h2>Releases</h2>
              <div v-if="game.logs.length">
                <div v-for="log in reverseLogs" :key="log.id">
                  <Icon :user="log.user" :size="25" />
                  {{ createLogMessage(log) }}
                </div>
              </div>
              <div v-else>
                まだリリースされていいません
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Icon from "src/components/Icon";
import axios from "axios";
import EditVersion from "src/components/EditVersion";
import EditDescription from "src/components/EditDescription";

export default {
  name: "GameDetails",
  components: {
    Icon,
    EditVersion,
    EditDescription
  },
  data() {
    return {
      game: null,
      imgUrl: "",
      videoUrl: ""
    };
  },
  created() {
    axios
      .get(`/api/games/info/${this.$route.params.id}`)
      .then(res => {
        this.game = res.game;
      })
      .catch(e => {
        alert(e);
      });
    axios
      .get(`/api/games/${this.$route.params.id}/image`)
      .then(res => {
        this.imgUrl = res.imgUrl;
      })
      .catch(e => {
        alert(e);
      });
    axios
      .get(`/api/games/${this.$route.params.id}/video`)
      .then(res => {
        this.videoUrl = res.videoUrl;
      })
      .catch(e => {
        alert(e);
      });
  },
  methods: {
    async reloadGame() {
      const res = await axios
        .get(`/api/games/info/${this.$route.params.id}`)
        .catch(e => {
          alert(e);
        });
      this.game = res.game;
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

      this.imgUrl = game.url;
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

      this.videoUrl = game.url;
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
