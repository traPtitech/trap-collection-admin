<template>
  <div class="container">
    <h1>新規ランチャーバージョン作成</h1>
    <div>
      <v-form ref="form">
        <v-textarea
          outlined
          v-model="versionName"
          :rules="[() => !!versionName || 'バージョンを入力してください']"
          placeholder="バージョン名"
        />
      </v-form>
    </div>
    <div>
      <v-form ref="form">
        <v-textarea
          outlined
          v-model="versionDescription"
          :rules="[() => !!versionDescription || '説明文を入力してください']"
          placeholder="バージョンの説明"
        />
      </v-form>
    </div>
    <v-divider />
    <div class="button_wrapper">
      <v-btn @click="createVersion()">更新</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddVersion",
  data() {
    return {
      versionName: "",
      versionDescription: "",
      gameFile: "",
      gameUrl: ""
    };
  },

  methods: {
    async createVersion() {
      try {
        await axios.post(`/api/games/version/${this.$route.params.id}`, {
          name: this.versionName,
          description: this.versionDescription
        });
      } catch (e) {
        alert(e);
      }
      try {
        await axios.post(`/api/games/asset/${this.$route.params.id}/url`, {
          url: this.gameUrl
        });
      } catch (e) {
        alert(e);
      }
      this.addFile(this.gameFile);
      this.isDialogOpen = !this.isDialogOpen;
      this.$emit("reload");
    },
    addFile(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createFile(files[0]);
    },
    async createFile(file) {
      const form = new FormData();
      form.enctype = "multipart/form-data";
      form.append("file", file);
      await axios
        .post(`/api/games/asset/${this.$route.params.id}/file`, form)
        .catch(e => alert(e));
    }
  }
};
</script>
<style scoped>
.container {
  margin: 16px;
  max-width: 70%;
}
.button_wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
