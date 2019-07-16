<template>
  <section class="navbar">
    <header class="navbar__header">
      <section class="navbar__block">
        <SidebarButton
          v-if="showSidebar"
          :isOpened="isSidebarOpen"
          @toggle-sidebar="$emit('toggle-sidebar')"
        />

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

          <img
            class="logo-short"
            v-if="$site.themeConfig.logoShort"
            :src="$withBase($site.themeConfig.logoShort)"
            :alt="$siteTitle"
          >

        </router-link>

        <!-- <div class="line"></div> -->

        <div
          ref="siteName"
          class="site-name"
          v-if="showTitle && $siteTitle"
        >
          {{ $siteTitle }}
        </div>

        <template v-if="showSearch">
          <AlgoliaSearchBox
            v-if="isAlgoliaSearch"
            :options="algolia"
          />
          <SearchBox v-else-if="$site.themeConfig.search !== false"/>
        </template>
      </section>
      <section class="navbar__block">
        <button
          class="menu-btn"
          :class="{ 'menu-btn--opened': isProductsOpen }"
          @click="toggleProducts"
        >
          {{ $themeLocaleConfig.navBar.products }}
        </button>
        <button class="navbar-btn navbar-btn--submit-request">{{ $themeLocaleConfig.navBar.submitRequest }}</button>
        <div
          class="links"
          :style="{
           'max-width': linksWrapMaxWidth + 'px'
          }"
        >
          <a :href="$site.themeConfig.try_free" target="_blank" class="navbar-btn navbar-btn--try-free">{{ tryFreeTitle }}</a>

          <NavLinks class="can-hide"/>
        </div>
      </section>
    </header>
    <ProductsMenu
      v-if="isProductsOpen"
      @close-menu="setProductsOpen(false)"
    />
  </section>
</template>

<script>
  import SidebarButton from './SidebarButton.vue'
  import AlgoliaSearchBox from './AlgoliaSearchBox'
  import SearchBox from './SearchBox.vue'
  import NavLinks from './NavLinks.vue'
  import ProductsMenu from "../components/ProductsMenu";
  import {mapActions, mapGetters} from "vuex";

  export default {
    props: {
      showSearch: {
        type: Boolean,
        default: true,
      },
      showTitle: {
        type: Boolean,
        default: true,
      },
      showSidebar: {
        type: Boolean,
        default: true,
      },
    },
    components: {SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox, ProductsMenu},

    data() {
      return {
        linksWrapMaxWidth: null,
        productsDisplayed: false,
      }
    },

    mounted() {
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

    methods: {
      ...mapActions('page', [
        'setProductsOpen',
      ]),
      toggleProducts() {
        this.setProductsOpen(!this.isProductsOpen);
      }
    },

    computed: {
      ...mapGetters('page', [
        'isSidebarOpen',
        'isProductsOpen',
      ]),
      algolia() {
        return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      },

      isAlgoliaSearch() {
        return this.algolia && this.algolia.apiKey && this.algolia.indexName
      },

      tryFreeTitle() {
        return this.$themeLocaleConfig.tryFree || 'Try Free';
      }
    }
  }

  function css(el, property) {
    // NOTE: Known bug, will return 'auto' if style value is 'auto'
    const win = el.ownerDocument.defaultView
    // null means not to return pseudo styles
    return win.getComputedStyle(el, null)[property]
  }
</script>

<style lang="stylus">
  @import '../styles/config.styl'

  .navbar
    position relative
    box-shadow: 0 3px 7px 0 rgba(0, 0, 0, 0.23);
    display flex
    flex-direction column

    &__header
      display flex
      align-items center
      justify-content space-between
      padding 0.8125rem 1.5rem
      height $navbarHeight
      box-sizing border-box

    &__block
      display flex
      align-items center
      height 100%

    span
      display inline-block

    .home-link
      display flex
      align-items center

    .logo
      min-width $navbarHeight - 1.4rem
      margin-right 1.5rem
      vertical-align top

    .site-name
      font-size 1rem
      font-weight 600
      color white
      position relative
      padding-right: 1rem;
      line-height: 1.2rem;

    .links
      height 100%
      box-sizing border-box
      white-space nowrap
      font-size 0.9rem
      display flex

      .search-box
        flex: 0 0 auto
        vertical-align top

      .nav-links
        flex 1

  .navbar-btn
    margin-right 1rem

  .logo-short
    margin-right 1rem
    display none

  .menu-btn
    cursor pointer
    height 100%
    box-sizing border-box
    display flex
    align-items center
    font-size 0.88rem
    font-weight 600
    background-color transparent
    border: none;
    border-radius 4px
    color #fff
    margin-right 20px
    padding 0 10px 0 16px

    &:after
      transform rotate(180deg)
      transition 0.3s
      margin-top -2px
      margin-left 6px
      content ''
      display: block;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 5px solid #fff;

    &--opened
      background-color rgba(0, 0, 0, 0.15)

      &:after
        transform rotate(0deg)

  @media (max-width: $MQDesktop)
    .nav-item .title
      display none

  @media (max-width: $MQNarrow)
    .logo
      display none

    .logo-short
      display inline-block

  @media (max-width: $MQTablet)
    .site-name
      display none

  @media (max-width: $MQMobile)
    .navbar
      &__header
        padding-left 0.8125rem
        padding-right 0.5rem

      .can-hide
        display none

      .links
        display none

    .navbar-btn
      display none !important

    .menu-btn
      margin-left 5px
      margin-right 0

</style>
