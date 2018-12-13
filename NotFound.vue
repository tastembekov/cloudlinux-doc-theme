<template>
  <div v-if="isRender" class="theme-container">
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
      isRender: false
    };
  },
  created() {
    const defaultURL = this.$site.themeConfig.defaultURL;
    console.log(this.$route.fullPath);
    if (defaultURL && this.$route.fullPath === "/") {
      this.$router.push(defaultURL);
      console.log("isRender=" + this.isRender);
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
    this.isRender = true;
  },
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
  }
};
</script>
