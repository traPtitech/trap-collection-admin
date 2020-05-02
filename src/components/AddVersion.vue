<template>
  <div>
    <v-btn x-small outlined fab dark color="primary" @click.stop="toggle">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div class="text-center">
      <v-dialog light v-model="isDialogOpen" max-width="290">
        <v-card>
          <v-card-title class="headline">バージョンを追加する</v-card-title>
          <v-card-actions>
            <v-form ref="form">
              <v-textarea
                outlined
                v-model="versionName"
                :rules="[() => !!versionName || 'バージョンを入力してください']"
                placeholder="バージョン名"
              />
            </v-form>
          </v-card-actions>
          <v-card-actions>
            <v-form ref="form">
              <v-textarea
                outlined
                v-model="versionDescription"
                :rules="[
                  () => !!versionDescription || '説明文を入力してください'
                ]"
                placeholder="バージョンの説明"
              />
            </v-form>
          </v-card-actions>
          <v-card-actions>
            <v-file-input
              v-model="gameFile"
              chips
              show-size
              accept=".jar"
              multiple
              label="ファイルを追加してください"
            ></v-file-input>
          </v-card-actions>
          <v-card-actions>
            <v-form ref="form">
              <v-textarea
                outlined
                v-model="gameUrl"
                :solo="solo"
                :rules="[() => !!gameUrl || 'URLを入力してください']"
                placeholder="バージョンのURL"
              />
            </v-form>
          </v-card-actions>
          <v-divider />
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="createVersion()">更新</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      gameUrl: "",
      error: "",
      isDialogOpen: false
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
        this.error = e;
      }
      try {
        await axios.post(`/api/games/asset/${this.$route.params.id}/url`, {
          url: this.gameUrl
        });
      } catch (e) {
        alert(e);
        this.error = e;
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
    },
    toggle() {
      this.isDialogOpen = !this.isDialogOpen;
    }
  }
};
</script>
