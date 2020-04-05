<template>
  <nobr>
    <v-btn x-small outlined fab dark color="primary" @click.stop="open">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div class="text-center">
      <v-dialog light v-model="isOpenDescription" max-width="290">
        <v-card width="290">
          <v-card-title class="headline">説明文を変更する</v-card-title>
          <v-card-actions>
            <div>
              <v-form ref="form">
                <v-textarea
                  outlined
                  v-model="text"
                  :rules="[() => !!text || 'This field is required']"
                  label="説明文"
                />
              </v-form>
            </div>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn v-on:click="description()">変更を保存する</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </nobr>
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
      message: ''
    };
  },
  props: {
    propItem: Object
  },
  methods: {
    async description() {
      if (this.text === null) {
        alert('説明文を入力してください');
        return false;
      }
      await axios
        .post(`/api/games/info/${this.$route.params.id}/description`, {
          text: this.text
        })
        .catch(e => {
          alert(e);
          this.error = e;
        });
      if (!this.error) {
        this.$parent.data.description.push({
          user: this.$store.state.me,
          text: this.text
        });
      }
      this.isOpenDescription = !this.isOpenDescription;
    },
    open() {
      this.isOpenDescription = !this.isOpenDescription;
    }
  }
};
</script>
