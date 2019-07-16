export default {
  computed: {
    languagesList() {
      const {locales} = this.$site
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path
        const routes = this.$router.options.routes
        const themeLocales = this.$site.themeConfig.locales || {}
        const languageDropdown = {
          title: this.$themeLocaleConfig.title || 'Language',
          text: this.$themeLocaleConfig.selectText || 'En',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const themeLocale = themeLocales[path] || {}
            const text = themeLocale.label || locale.lang
            const shortText = themeLocale.selectText || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return {text, shortText, link}
          })
        }
        return languageDropdown
      }
      return undefined
    }
  },
  methods: {
    isLangLinkActive (langLink) {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink ===langLink)
      }
      return langLink === '/'
    }
  }
}
