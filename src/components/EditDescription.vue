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
          <v-divider />
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="editDescription()">更新</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "EditDescription",
  data() {
    return {
      text: "",
      isOpenDescription: false,
      message: ""
    };
  },
  props: {
    propGame: Object
  },
  mounted() {
    this.text = this.propGame.description;
  },
  methods: {
    async editDescription() {
      try {
        await axios.put(
          `/api/games/${this.$route.params.id}/info/description`,
          {
            text: this.text
          }
        );
      } catch (e) {
        alert(e);
      }
      this.isOpenDescription = !this.isOpenDescription;
      this.$emit("reloadGame");
    },
    toggle() {
      this.isOpenDescription = !this.isOpenDescription;
    }
  }
};
</script>
