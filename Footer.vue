<template>
  <div class="footer">
      <!-- <div class="sidebar-width"></div> -->
      <div>
        <a :href="$site.themeConfig.cloudlinuxSite">
          img src="./we-are-cloudlinux.svg" alt="We are Cloudlinux">
        </a>
      </div>
      <div>2018. CloudLinux Inc</div>
      <div>
          <div v-for="item in $site.themeConfig.bottomLinks" :key="item">
              <a :href="item.url" target="_blank">{{ item.text }}</a>
          </div>
      </div>

      <div class="social">
        <span>Stay in touch</span>
        <a v-for="item in $site.themeConfig.social"
            :key="item"
            :href="item.url" target="_blank">
            <img :src="item.logo">
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
    margin-left $sidebarWidth + 2rem
    color $grayTextColor
    text-align center
    border-top 1px solid $borderColor
    height 102px
    // width 100%
    background #fff
    display flex
    flex-flow row wrap
    justify-content space-around
    align-items center
    // margin-left 2rem

    div
        margin 5px
        font-size 12px
        display inline-flex

    a
        display inline-block
        margin-left 10px
    img
        cursor pointer

.social
    display flex
    justify-content center
    align-items center
    padding-left 20px
    a
        margin-left 0px
        margin-right -5px

.sidebar-width
    width $sidebarWidth + 2rem

@media (max-width: $MQMobile)
  .footer
    justify-content center
    margin-left 0
    div
      display block
</style>
