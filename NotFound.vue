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
    const defaultURL = this.$site.themeConfig.defaultURL;
    if (defaultURL && this.$route.fullPath === "/") {
      this.$router.push(defaultURL);
      this.$forceUpdate();
      return;
    }

    const redirectionMapping = this.$site.themeConfig.redirectionMapping;
    console.log(this.$route.fullPath);
    console.log(redirectionMapping);
    if (redirectionMapping) {
      if (/.htm[l]*[\/]*$/.test(this.$route.fullPath)) {
        const newUrl = redirectionMapping[this.$route.fullPath];
        console.log(newUrl);
        if (newUrl) {
          this.$router.replace(newUrl);
          return;
        }
      }
    }
  },
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
  }
};
</script>
