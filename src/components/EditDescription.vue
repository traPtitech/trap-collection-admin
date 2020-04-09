<template>
  <div>
    <v-btn x-small outlined fab dark color="primary" @click.stop="toggle">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div class="text-center">
      <v-dialog light v-model="isOpenDescription" max-width="290">
        <v-card>
          <v-card-title class="headline">説明文を変更する</v-card-title>
          <v-card-actions>
            <v-form ref="form">
              <v-textarea
                outlined
                v-model="text"
                :rules="[() => !!text || '説明文を入力してください']"
                placeholder="説明文"
              />
            </v-form>
          </v-card-actions>
          </v-divider>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="description()">更新</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditDescription',
  data() {
    return {
      text: null,
      error: '',
      isOpenDescription: false,
      message: '',
    };
  },
  mounted() {
    this.text = this.propGame.version.description
  },
  methods: {
    async description() {
      if (this.text === null) {
        alert('説明文を入力してください');
        return false;
      }
      try {
        await axios
        .post(`/api/games/info/${this.$route.params.id}/description`, {
          text: this.text,
        });
        this.$parent.data.description.push({
          user: this.$store.state.me,
          text: this.text,
        });
      }
      catch (e) {
        alert(e);
        this.error = e;
      }
      this.isOpenDescription = !this.isOpenDescription;
      this.$emit('reload')
    },
    toggle() {
      this.isOpenDescription = !this.isOpenDescription;
    },
  },
};
</script>
