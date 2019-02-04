<template>
  <div class="page-nav" v-if="prev || next">
      <router-link
        v-if="prev"
        class="link prev"
        :to="prev.path"
      >
        ←
      </router-link>

      <router-link
        v-if="next"
        class="link"
        :to="next.path"
      >
        →
      </router-link>
  </div>
</template>

<script>
  import {resolvePage} from '../util'

  export default {
    name: "PageNav",

    props: ['sidebarItems'],

    computed: {
      prev() {
        const prev = this.$page.frontmatter.prev
        if (prev === false) {
          return
        } else if (prev) {
          return resolvePage(this.$site.pages, prev, this.$route.path)
        } else {
          return this.resolvePrev(this.$page, this.sidebarItems)
        }
      },

      next() {
        const next = this.$page.frontmatter.next
        if (next === false) {
          return
        } else if (next) {
          return resolvePage(this.$site.pages, next, this.$route.path)
        } else {
          return this.resolveNext(this.$page, this.sidebarItems)
        }
      },
    },

    methods: {
      resolvePrev(page, items) {
        return this.find(page, items, -1)
      },
      resolveNext(page, items) {
        return this.find(page, items, 1)
      },
      find(page, items, offset) {
        const res = [];
        items.forEach(item => {
          if (item.type === 'group') {
            res.push(...item.children || [])
          } else {
            res.push(item)
          }
        });
        for (let i = 0; i < res.length; i++) {
          const cur = res[i]
          if (cur.type === 'page' && cur.path === page.path) {
            return res[i + offset]
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import '../styles/config.styl'
  @require '../styles/wrapper.styl'

  .page-nav
    @extend $wrapper
    margin 0
    padding 0
    display flex
    position absolute
    right 0
    top 30px

    .link
      border-radius 1.1rem
      border 1px solid #f2f4f5
      text-align center
      height 2.2rem
      width 2.2rem
      display block
      font-size 1.7rem
      line-height 2.2rem
      color #3a3d3f
      font-weight 200
      box-shadow 0 0 1px 1px #f2f4f5

      &.prev
        margin-right 9px

      &:hover
        color #adadad

    // clear float
    .next
      float right
</style>
