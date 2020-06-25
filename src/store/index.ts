import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    me: null,
    drawer: null,
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage: null // 背景画像の設定
  },
  mutations: {
    setMe(state, me) {
      state.me = me;
    },
    setDrawer(state, payload) {
      state.drawer = payload;
    }
  },
  actions: {
    whoAmI({ commit }) {
      return new Promise(resolve => {
        axios
          .get("/api/user/me")
          .then(async res => {
            const data = res.data;
            const me = {
              id: data.userId,
              name: data.name
            };
            commit("setMe", me);
          })
          .catch(() => {
            commit("setMe", null);
          })
          .finally(() => {
            resolve();
          });
      });
    }
  },
  modules: {}
});
