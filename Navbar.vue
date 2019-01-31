<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

    <router-link
      :to="$localePath"
      class="home-link"
    >
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        ref="siteName"
        class="site-name site-name--documentation"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </router-link>

    <!-- <div class="line"></div> -->

    <AlgoliaSearchBox
      v-if="isAlgoliaSearch"
      :options="algolia"
    />
    <SearchBox v-else-if="$site.themeConfig.search !== false"/>

    <div
      class="links"
      :style="{
        'max-width': linksWrapMaxWidth + 'px'
      }"
    >
      <a :href="$site.themeConfig.try_free" target="_blank" class="btn">
        Try Free
      </a>

      <NavLinks class="can-hide"/>
    </div>
  </header>
</template>

<script>
import SidebarButton from './SidebarButton.vue'
import AlgoliaSearchBox from './AlgoliaSearchBox'
import SearchBox from './SearchBox.vue'
import NavLinks from './NavLinks.vue'

export default {
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
          (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
@import './styles/config.styl'

$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.5rem
  position relative
  height: $navbarHeight - 3rem
  box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23);

  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.6rem
    min-width $navbarHeight - 1.4rem
    margin-right 1.5rem
    vertical-align top
  .site-name
    font-size 1rem
    font-weight 600
    color white
    position relative
  .site-name--documentation
    border-right: 1px solid #fff;
    padding-right: 1rem;
    line-height: 1.2rem;
  .links
    box-sizing border-box
    background-color $mainColor
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top 0
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top
    .nav-links
      flex 1

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .btn
      margin: 0.65rem 0 0 0

.btn
    // -webkit-appearance: button;
    // -moz-appearance: button;
    // appearance: button;
    padding 0.7rem 1.6rem;

    position: relative;
    background-color: $mainColor;
    border: 2px solid #fff;
    border-radius: 4px;
    font-size: 0.88rem;
    line-height: 1rem;
    margin 0.65rem 1rem 0 0
    color: #FFFFFF;
    text-align: center;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    font-weight 600


.btn:hover
  text-decoration underline

.btn:after
    content: "";
    background: #fff;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px!important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s


.btn:active:after
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
</style>
