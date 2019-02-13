<template>
  <div class="theme-container" v-if="showNotFound">
    <div class="content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">Take me home.</router-link>
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
];

export default {
  data() {
    return {
      showNotFound: false
    };
  },
  created() {
    const redirectionMapping = this.$site.themeConfig.redirectionMapping;
    if (redirectionMapping) {
      const newUrl = redirectionMapping[this.$route.fullPath];
      if (newUrl) {
        this.$router.replace(newUrl);
        return;
      }
    }

    this.showNotFound = true;
  },
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
  }
};
</script>
