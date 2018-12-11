<template>
  <div class="theme-container">
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
  created() {
    // redirect to default URL instead of 404

    const redirectionMapping = this.$site.themeConfig.redirectionMapping;
    if (redirectionMapping) {
      // debugger
      if (/.htm[l]*$/.test(this.$route.fullPath)) {
        const newUrl = redirectionMapping[this.$route.fullPath];
        // debugger
        if (newUrl) {
          this.$router.replace(newUrl);
          return;
        }
      }
    }

    const defaultURL = this.$site.themeConfig.defaultURL;
    if (defaultURL && this.$route.fullPath === "/") {
      this.$router.push(defaultURL);
    }
  },
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
  }
};
</script>
