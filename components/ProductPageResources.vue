<template lang="html">
  <div class="product-page-resources">
    <section class="resources">
      <h3 class="resources__title">{{ $frontmatter.resources.title }}</h3>
      <ul class="resources__items">
        <li
          v-for="resource in $frontmatter.resources.items"
          class="resource"
        >
          <header class="resource__header">
            <div class="resource__icon-container">
              <img class="resource__icon" :src="resource.icon">
            </div>
            <span class="resource__title">{{ resource.header }}</span>
          </header>
          <div class="resource__desc">{{ resource.description }}</div>
          <div class="resource__link-container">
            <RelativeLink class="resource__link" :url="resource.route">{{ resource.linkTitle }} →</RelativeLink>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="js">
  import RelativeLink from "./RelativeLink";
  export default {
    components: {RelativeLink},
  }
</script>

<style scoped lang="stylus">
  @import '../styles/config.styl'

  .product-page-resources
    font-family "SF Text"
    display flex
    justify-content center

  .resources
    max-width 1440px
    margin 0 auto
    padding 50px 20px
    overflow hidden

    &__title
      margin-top 0
      width 100%
      font-size 16px
      font-weight bold
      line-height 1.75
      margin-bottom 40px

    &__items
      padding 0
      margin -15px -30px
      display flex
      flex-wrap wrap

  .resource
    flex-shrink 0
    width 285px
    height 214px
    margin 15px 30px
    box-shadow 0 0 10px 2px rgba(0, 0, 0, 0.03)
    border-radius 5px
    display flex
    flex-direction column

    &__header
      width 100%
      height 63px
      display flex
      align-items center
      border solid 1px #f2f4f5
      flex-shrink 0
      font-size 16px
      color #3d3d3d
      font-weight 500

    &__desc
      padding 18px 20px 0 59px
      line-height 1.62
      flex 1
      font-size 13px
      white-space pre-wrap

    &__title
      flex 1

    &__icon-container
      display flex
      align-items center
      justify-content center
      width 58px
      height 100%

    &__link-container
      flex-shrink 0
      padding 0 0 22px 59px
      line-height 2.5

    &__link
      color #1176dd
      text-decoration none
      font-size 13px
      font-weight 600

  @media (max-width: $MQTablet)
    .resources
      &__items
        justify-content center

</style>
