<template>
  <v-footer class="footer">
    <v-row>
      <v-col v-for="(link, i) in links" :key="i" class="container">
        <a
          class="item"
          :href="link.href"
          rel="noopener"
          target="_blank"
          v-text="link.text"
        />
      </v-col>
      <v-spacer class="hidden-sm-and-down" />
      <v-col cols="12" md="auto" class="copyright">
        &copy; 2020, made by traP SysAd for a better management of games.
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "DashboardCoreFooter",

  data: () => ({
    links: [
      {
        href: "https://wiki.trap.jp",
        text: "Usage"
      }
    ]
  })
};
</script>
<style lang="scss" scoped>
.footer {
  position: absolute;
  bottom: 0;
  min-width: 100%;
}
.container .item {
  color: #4d4d4d;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
}
</style>
