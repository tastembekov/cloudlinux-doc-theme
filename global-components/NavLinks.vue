<template>
  <nav
    class="nav-links"
    v-if="userLinks.length || repoLink"
  >
    <!-- user links -->
    <div
      class="nav-item"
      v-for="item in userLinks"
      :key="item.link"
    >
      <DropdownLink
        v-if="item.type === 'links'"
        :item="item"
      />
      <NavLink
        v-else
        :item="item"
      />
    </div>

  </nav>
</template>

<script>
import DropdownLink from './DropdownLink.vue'
import { resolveNavLinkItem } from '../util'
import NavLink from './NavLink.vue'
import LanguageMixin from "../mixins/LanguageMixin";

export default {
  components: { NavLink, DropdownLink },
  mixins: [LanguageMixin],
  computed: {
    userNav () {
      return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
    },

    nav () {
      const languagesList = this.languagesList
      if (languagesList) {
        return [...this.userNav, this.languagesList]
      }
      return this.userNav
    },

    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },

    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
    },

    repoLabel () {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    }
  }
}
</script>

<style lang="stylus">
@import '../styles/config.styl'

.nav-links
  display inline-block
  a
    color #fff
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    position relative
    display inline-block
  .repo-link
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    a
      line-height 1.25rem
      color $accentColor
    .nav-item, .repo-link
      margin-left 0
      height 1rem

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color #fff
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
