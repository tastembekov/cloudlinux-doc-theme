<template>
  <div class="back-to-top">
    <router-link class="back-to-top__link" to="#app"></router-link>
  </div>
</template>

<script>
  export default {
    name: "BackToTop"
  };
</script>

<style lang="stylus" scoped>
  .back-to-top__link
    border-radius 1.45rem
    border 1px solid #f2f4f5
    text-align center
    height 2.9rem
    width 2.9rem
    display block
    font-size 1.7rem
    line-height 2.9rem
    color #3a3d3f
    font-weight 200
    box-shadow 0 0 1px 1px #f2f4f5
    position absolute
    right 6rem
    margin-top -3rem

    &:after {
      content '\2191'
    }
    &:hover
      color #adadad
</style>
