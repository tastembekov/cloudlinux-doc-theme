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

import RedirectMixin from '../mixins/RedirectMixin';

export default {
  name: 'NotFound',
  mixins: [RedirectMixin],
  data() {
    return {
      showNotFound: false
    };
  },
  mounted() {
    this.showNotFound = !this.checkRedirect();
  },
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
  }
};
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
