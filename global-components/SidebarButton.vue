<template>
  <div
    class="sidebar-button"
    :class="{'sidebar-button--opened': isOpened}"
    @click="$emit('toggle-sidebar')"
  >
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" viewBox="0 0 448 512">
      <path fill="currentColor" d="M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z" class=""></path>
    </svg>
  </div>
</template>

<script>
  export default {
    props: {
      isOpened: Boolean
    }
  }
</script>

<style lang="stylus">

.sidebar-button
  cursor pointer
  margin-right 1rem
  color: #fff
  display none
  width 1.25rem
  height 1.25rem
  padding 0.6rem
  top 0.6rem
  left 1rem
  border-radius 100%

  &--opened
    background-color rgba(0,0,0, 0.15)

  .icon
    display block
    width 1.25rem
    height 1.25rem

@media (max-width: $MQMobile)
  .sidebar-button
    display block
</style>
