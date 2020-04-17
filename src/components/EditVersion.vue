<template>
  <div>
    <v-btn x-small outlined fab dark color="primary" @click.stop="toggle">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div class="text-center">
      <v-dialog light v-model="isOpenVersion" max-width="290">
        <v-card>
          <v-card-title class="headline">バージョンを追加する</v-card-title>
          <v-card-actions>
            <v-form ref="form">
              <v-textarea
                outlined
                v-model="text"
                :rules="[() => !!text || 'バージョンを入力してください']"
                placeholder="バージョン名"
              />
            </v-form>
          </v-card-actions>
          </v-divider>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="version()">更新</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditVersion',
  data() {
    return {
      text: null,
      error: '',
      isOpenVersion: false,
    };
  },
  
  
  methods: {
    async version() {
      if (this.text === null) {
        alert('バージョン名を入力してください');
        return false;
      }
      try {
        await axios
        .put(`/api/games/version/${this.$route.params.id}`, {
          name: this.text,
        });
      }
      catch (e) {
        alert(e);
        this.error = e;
      }
      this.isOpenVersion = !this.isOpenVersion;
      this.$emit('reload')
    },
    toggle() {
      this.isOpenVersion = !this.isOpenVersion;
    },
  },
};
</script>
