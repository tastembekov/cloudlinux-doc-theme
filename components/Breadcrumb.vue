<template>
  <div class="breadcrumb-wrapper">
    <span class="breadcrumb-title">{{ $siteTitle }}:</span>
    <router-link class="breadcrumb" v-for="crumb in bread" :key="crumb.path" :to="crumb.path">
      {{ crumb.title }}
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumb",
    computed: {
      bread() {
        const parts = this.$page.path.split("/");
        if (!parts[parts.length - 1].length) {
          parts.pop();
        }
        let link = "";
        const crumbs = [];
        for (let i = 0; i < parts.length; i++) {
          link += parts[i];
          const page = this.$site.pages.find((el) => el.path === link || el.path === link + "/");
          link += "/";
          if (page != null && page.path !== '/') {
            crumbs.push({path: page.path, title: page.frontmatter.breadcrumb || page.title});
          }
        }
        return crumbs;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .breadcrumb
    color #adadad

    &::after
      content ">"
      font-family inherit
      font-size inherit

    &:last-child
      cursor default

  .breadcrumb-title
    color #adadad
    font-weight 600
    margin-right 2px
</style>
