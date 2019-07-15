<template>
  <div
    class="sidebar-group"
    :class="{ first, collapsable }"
  >
    <div
      class="sidebar-heading"
      :class="{ open }"
      @click="$emit('toggle')"
    >
      <span>{{ item.title }}</span>
      <span
        class="arrow"
        v-if="collapsable"
        :class="open ? 'down' : 'right'">
      </span>
    </div>

    <DropdownTransition>
      <ul
        ref="items"
        class="sidebar-group-items"
        v-if="open || !collapsable"
      >
        <li v-for="child in item.children">
          <SidebarLink :item="child"/>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import DropdownTransition from './DropdownTransition.vue'

export default {
  name: 'SidebarGroup',
  props: ['item', 'first', 'open', 'collapsable'],
  components: { SidebarLink, DropdownTransition }
}
</script>

<style lang="stylus">
  @import '../styles/config.styl'

.sidebar-group
  &:not(.first)
    margin-top 1em
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable)
    .sidebar-heading
      cursor auto
      color inherit

.sidebar-heading
  color #3a3d3f
  cursor pointer
  font-size 0.95em
  padding 0 1.5rem
  margin 0 1.2rem 1.5rem 1.6rem
  height 41px
  line-height 41px
  background-color $codeBgColor
  border-radius 4px
  font-weight 600

  &.open, &:hover
    color inherit
  .arrow
    position relative
    top -0.12em
    left 0.5em
  &:.open .arrow
    top -0.18em

.sidebar-group-items
  transition height .1s ease-out
  overflow hidden
</style>
