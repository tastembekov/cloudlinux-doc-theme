<template lang="html">

  <section class="products-menu">
    <section class="nav">
      <div class="nav__top">
        <header class="nav__title">{{ menu.product }}</header>
        <ul>
          <li
            v-for="product in menu.list"
            class="nav__item"
            @click="selectedName = product.name"
            :class="{ 'nav__item--selected': product.name === activeProduct.name }"
          >
            {{ product.name }}
          </li>
        </ul>

        <section class="actions">
          <button class="navbar-btn navbar-btn--submit-request">{{ $themeLocaleConfig.navBar.submitRequest }}</button>
          <a :href="$site.themeConfig.try_free" target="_blank" class="navbar-btn navbar-btn--try-free">{{ tryFreeTitle }}</a>
        </section>
      </div>

      <div class="nav__bottom lang" v-if="languagesList">
        <div class="lang__title">
          {{ languagesList.title }}:
        </div>
        <ul class="lang__items">
          <li v-for="lang in languagesList.items" class="lang__item">
            <router-link
              class="lang__link"
              :to="lang.link"
              :exact="isLangLinkActive(lang.link)"
            >
              {{ lang.shortText }}
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <section class="resources">
      <header class="resources__title">{{ menu.resources }} for {{ activeProduct.name }}</header>
      <ul class="resources__items">
        <li class="resource" v-for="resource in activeProduct.resources">
          <RelativeLink
            class="resource__content"
            :url="resource.url"
            @click="emitCloseMenu"
          >
            <span class="resource__icon-container">
              <img class="resource__icon" :src="resource.icon">
              <i class="resource__icon" :class="{
                'resource__icon--blog': true,
              }"></i>
            </span>
            <span>{{ resource.name }}</span>
          </RelativeLink>
        </li>
      </ul>
    </section>
  </section>

</template>

<script lang="js">
  import RelativeLink from "./RelativeLink";
  import find from 'lodash/find';
  import LanguageMixin from "../mixins/LanguageMixin";

  export default {
    components: {RelativeLink},
    mixins: [LanguageMixin],
    mounted() {
      document.addEventListener('click', this.onDocumentClicked);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.onDocumentClicked);
    },
    data() {
      return {
        selectedName: '',
      }
    },
    methods: {
      onDocumentClicked(event) {
        if (!this.$el.contains(event.target)) {
          this.emitCloseMenu();
        }
      },
      emitCloseMenu() {
        this.$emit('close-menu');
      },
    },
    computed: {
      menu() {
        return this.$themeLocaleConfig.navBar.productsMenu;
      },
      activeProduct() {
        const selected = find(this.menu.list, (p) => p.name === this.selectedName);
        if (selected) {
          return selected;
        }
        return find(this.menu.list, (p) => p.default);
      },
      resources() {
        this.menu.list
      },
      tryFreeTitle() {
        return this.$themeLocaleConfig.tryFree || 'Try Free';
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../styles/config.styl'

  ul
    padding 0

    li
      padding 0
      text-indent 0
      list-style-type none

  .products-menu
    min-height 294px
    max-height "calc(100vh - %s)" % $navbarHeight
    background-color white
    margin-bottom 5px
    display flex
    font-size 0.81rem
    border-bottom 5px solid $mainColor

    &__resources-wrap
      overflow auto

  .nav
    background-color #f5f6fa
    padding 20px 44px 0 35px
    min-width 188px
    max-width 294px
    width 100%
    box-sizing border-box
    display flex
    flex-direction column
    justify-content space-between

    &__title
      padding-left 28px
      line-height 2.33
      font-size 0.75rem
      font-weight bold

    &__item
      min-height 34px
      padding 0 10px 0 28px
      margin-bottom 5px
      display flex
      align-items center
      cursor pointer
      border 2px solid transparent
      box-sizing border-box
      border-radius 4px
      transition border-color 0.3s

      &:hover
        border-color white

      &--selected
        transition background-color 0.4s
        border-radius 4px
        box-shadow 0 2px 6px 0 rgba(0, 0, 0, 0.05)
        background-color #ffffff

  .resources
    padding 20px 20px 40px 33px
    max-height: "calc(100vh - %s - 1rem)" % $navbarHeight
    box-sizing: border-box
    overflow-x hidden
    overflow-y auto

    &__title
      line-height 2.33
      font-size 0.75rem
      font-weight bold
      padding-bottom 15px

    &__items
      display flex
      flex-wrap wrap
      margin -10px -5px

  .resource
    flex-shrink 0
    width 138px
    height 107px
    border-radius 4px
    border solid 1px #f2f4f5
    margin 10px 5px

    &:hover
      text-decoration underline

    &__content
      height 100%
      display flex
      flex-direction column
      justify-content center
      align-items center
      color #314659
      font-weight normal

    &__icon-container
      width 45px
      height 35px
      padding-bottom 13px

    &__icon
      width 100%
      height 100%
      max-height 100%
      max-width 100%

  .actions
    display none
    flex-direction column
    align-items flex-start
    padding-left 18px

  .navbar-btn
    border-color $mainColor
    margin-right 0

    &--submit-request
      color $mainColor
      margin-bottom 10px

    &--try-free
      background-color $mainColor
      color #fff

  .lang
    display none
    padding 20px 0 26px 22px
    align-items center

    &__title
      margin-right 10px

    &__items
      display flex
      flex-wrap wrap
      margin -4px -3px
      margin 0

    &__item
      margin 4px 3px

    &__link
      color $mainColor
      border 2px solid transparent
      padding 4px

      &.router-link-exact-active
        border-color $mainColor

  @media (max-width: $MQMobile)
    .products-menu
      position fixed
      top $navbarHeight
      bottom 0
      margin-bottom 0

    .nav
      padding-left 5px
      padding-right 9px

    .resources
      padding-left 10px
      padding-right 10px

    .nav
      &__item
        padding-left 18px

    .lang
      display flex

    .actions
      display flex

    .navbar-btn
      display flex !important

</style>
