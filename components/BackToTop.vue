<template>
  <div class="back-to-top">
    <router-link class="nav-arrow top back-to-top__link" to="#app"></router-link>
  </div>
</template>

<script>
  export default {
    name: "BackToTop"
  };
</script>

<style lang="stylus" scoped>
  .back-to-top__link    
    position absolute
    right 6rem
    margin-top -3rem
</style>
