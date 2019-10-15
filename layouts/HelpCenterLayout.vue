<template>
  <div class="theme-container product-page">
    <header class="product-page__header">
      <Navbar
        :showSearch="false"
        :showTitle="false"
        :showSidebar="false"
      />
      <div class="product-page__title-container">
        <h1 class="product-page__title">
          {{ $themeLocaleConfig.productPage.title }}
        </h1>
        <div class="product-page__subtitle">
          {{ $themeLocaleConfig.productPage.subtitle }}
        </div>
        <ProductsSearchBar />
      </div>
    </header>
    <div class="product-page__content">
      <HelpCenterProducts/>
    </div>
    <Footer/>
  </div>
</template>
<script>
  import Navbar from '../global-components/Navbar.vue'
  import HelpCenterProducts from "../components/HelpCenterProducts";
  import Footer from "../global-components/Footer";
  import ProductsSearchBar from '../components/algolia-search-home/ProductsSearchBar';

  export default {
    components: {Navbar, HelpCenterProducts, Footer, ProductsSearchBar},
  }
</script>

<style lang="stylus" scoped>
  @import '../styles/config.styl'

  .product-page
    min-height 100vh
    display flex
    flex-direction column

    &__header
      padding-top $navbarHeight
      background $productPageBackground
      box-sizing border-box
      height 25.69rem
      display flex
      align-items center
      justify-content center
      flex-shrink 0

    &__content
      height 100%
      flex 1

    &__title-container
      text-align center
      color #fff

    &__title
      margin-top -($navbarHeight)
      margin-bottom 0
      font-size 3.43rem
      color #fff
      padding 1rem 2rem

    .navbar
      position absolute
      background-color transparent
      box-shadow none
      border-bottom none

    .footer
      flex-shrink 0
      margin 0 20px

  >>> .sidebar-button
    display none

  @media (max-width: $MQMobile)
    .product-page
      &__header
        height 10rem

      &__title
        margin-bottom -($navbarHeight/2)
        font-size 1.2rem


</style>
<style src="../styles/theme.styl" lang="stylus"></style>
