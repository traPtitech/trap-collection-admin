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
  name: "EditVersion",
  data() {
    return {
      versionName: "",
      error: "",
      isDialogOpen: false
    };
  },

  methods: {
    async createVersion() {
      if (this.text === null) {
        alert("バージョン名を入力してください");
        return false;
      }
      try {
        await axios.put(`/api/games/version/${this.$route.params.id}`, {
          name: this.text
        });
      } catch (e) {
        alert(e);
        this.error = e;
      }
      this.isDialogOpen = !this.isDialogOpen;
      this.$emit("reload");
    },
    toggle() {
      this.isDialogOpen = !this.isDialogOpen;
    }
  }
};
</script>
