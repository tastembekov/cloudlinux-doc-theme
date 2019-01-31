<template>
  <div class="footer">
      <!-- <div class="sidebar-width"></div> -->
      <div>
        <a :href="$site.themeConfig.cloudlinuxSite">
          <img src="./we-are-cloudlinux.svg" alt="We are Cloudlinux">
        </a>
      </div>
      <div class="footer-company-title">2018. CloudLinux Inc</div>
      <div>
          <div v-for="item in $site.themeConfig.bottomLinks" :key="item">
              <a :href="item.url" target="_blank">{{ item.text }}</a>
          </div>
      </div>

      <div class="social">
        <span class="footer-social-text">Stay in touch</span>
        <a v-for="item in $site.themeConfig.social"
            :key="item"
            :href="item.url" target="_blank">
            <img :src="item.logo" class="footer-social-logo">
        </a>
      </div>
  </div>
</template>


<script>
export default {
    name: 'Footer'
}
</script>

<style lang="stylus" scoped>
@require './styles/config.styl'
.footer
    margin-left $sidebarWidth
    color #314659
    text-align center
    border-top 1px solid $borderColor
    height 102px
    // width 100%
    background #fff
    display flex
    flex-flow row wrap
    justify-content space-around
    align-items center
    margin-right 20px
    // margin-left 2rem

    div
        margin 5px
        font-size 0.8rem
        display inline-flex

    a
      display inline-block
      margin-left 10px
      &:hover
        text-decoration underline
    img
      border none
      cursor pointer

    .footer-company-title
      font-size 0.8rem
      color #d8d8d8

.social
    display flex
    justify-content center
    align-items center
    padding-left 20px
    .footer-social-text
      margin-right 13px
      line-height 20px
      padding-left 12px
      border-left 1px solid #ccc
    a
      margin 7px -5px 0 0
      .footer-social-logo
        height 42px
        width auto

.sidebar-width
    width $sidebarWidth + 2rem

@media (max-width: $MQMobile)
  .footer
    justify-content center
    margin-left 0
    div
      display flex
  .footer-social-text
    border none
</style>
