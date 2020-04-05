<template>
  <div v-if="data" class="d-flex flex-wrap">
    <v-container>
      <v-row>
        <v-col :cols="12" :sm="8" :lg="9" :xl="10">
          <h1>{{ game.name }}</h1>
          <div class="mb-8">
            <h2>
              {{ game.version.name }}
              <EditVersion @reload="reload" />
            </h2>
          </div>
          <div class="mb-8">
            {{ game.version.description }}
            <EditDescription @reload="reload" />
          </div>
          <v-row>
            <v-col>
              <div class="mb-4 cover-container">
                <v-img
                  src="game.img_url.length ? data.img_url : '/img/no-image.svg'"
                  height="180"
                  width="260"
                ></v-img>
                <EditImage @reload="reload" />
              </div>
            </v-col>
            <v-col>
              <div class="mb-4 cover-container">
                <video
                  class="cover"
                  src="game.movie_url.length ? game.movie_url : '/img/no-movie.svg'"
                ></video>
                <EditMovie @reload="reload" />
              </div>
            </v-col>
          </v-row>
          <div class="mb-8">
            <div>
              <h2>Releases</h2>
              <div v-if="data.logs.length">
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
import Icon from 'src/components/Icon';
import axios from 'axios';
import EditVersion from 'src/components/EditVersion';
import EditDescription from 'src/components/Description';
import EditImage from 'src/components/EditImage';
import EditMovie from 'src/components/EditMovie';
export default {
  name: 'GameDetails',
  components: {
    Icon,
    EditVersion,
    EditDescription,
    EditImage,
    EditMovie
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
