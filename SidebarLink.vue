<script>
import { isActive, groupHeaders } from './util'

export default {
  functional: true,

  props: ['item'],

  render (h, { parent: { $page, $site, $route }, props: { item }}) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path);
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active = item.type === 'auto'
      ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
      : selfActive;
    const link = renderHeader(h, item.path, item.title || item.path, active);
    const configDepth = $page.frontmatter.sidebarDepth != null
      ? $page.frontmatter.sidebarDepth
      : $site.themeConfig.sidebarDepth;
    const maxDepth = configDepth == null ? 1 : configDepth;
    if (item.type === 'auto') {
      return [link, renderChildren(h, item.children, item.basePath, $route, maxDepth)]
    } else {
      if (item.headers && item.headers.length > 0) {
        const children = groupHeaders(item.headers);
        return [link, renderChildren(h, children, item.path, $route, maxDepth)];
      }
      return renderLink(h, item.path, item.title || item.path, active, item.children);
    }
  }
}

function renderLink (h, to, text, active, children) {
  const link = h('router-link', {
      props: {
          to,
          activeClass: '',
          exactActiveClass: ''
      },
      class: {
          active,
          'sidebar-link': true
      }
  }, text);
  return h('div', {
    class: {
        active,
        'sidebar-link-container': !!children
    },
    on: {
        click: (e) => {
            const classes = e.target.classList;
            const isCollapsed = classes.contains('collapsed');
            isCollapsed ? classes.remove('collapsed') : classes.add('collapsed');
        }
    },
  }, [link]);
}

function renderHeader(h, to, text, active) {
  return h('div', {
    class: {
      active,
      'collapsed': active,
      'sidebar-header': true,
      'sidebar-link': true
    },
    on: {
      click: (e) => {
        const classes = e.target.classList;
        const isCollapsed = classes.contains('collapsed');
        isCollapsed ? classes.remove('collapsed') : classes.add('collapsed');
      }
    },
  }, [renderLink(h, to, text, active)])
}

function renderChildren (h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null;
  return h('ul', { class: 'sidebar-sub-headers' }, children.map(c => {
    const active = isActive(route, path + '#' + c.slug);
    return h('li', {
        class: {
            'collapsible': depth < 2,
            'sidebar-sub-header': true
        }
    }, [
      renderLink(h, path + '#' + c.slug, c.title, active, c.children),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1)
    ])
  }))
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.sidebar .sidebar-sub-header
  font-size 0.95em
  &.collapsible
    & > div
      margin-left 2rem
    & > .sidebar-link-container
      background-image url('data:image/png;base64,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')
      background-repeat no-repeat
      background-position left 20px top 17px
      background-size 9px 16px
      padding-left 2rem
      cursor pointer
      margin-left 0
      &.active
        background-color: #e6f7ff;
      &.collapsed
        background-image url('data:image/png;base64,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')
        background-size 16px 9px
        background-position: left 17px top 20px
        & + .sidebar-sub-headers
          display none
      .sidebar-link
        padding-left 0
        margin-left 1rem
  .sidebar-sub-headers
    margin-left 3rem
    &:first-child
      margin-left 0


.sidebar-link
  font-weight 400
  display inline-block
  color $textColor
  margin 0
  line-height 1.4
  cursor pointer
  &.sidebar-header
    background-image url('data:image/png;base64,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')
    background-repeat no-repeat
    background-position left 5px center
    background-size 9px 16px
    & + .sidebar-sub-headers
      display none
    &.collapsed
      border-left-color $accentColor
      background-image url('data:image/png;base64,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')
      background-size 16px 9px
      background-position left center
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color #3a3d3f
  &.collapsed + .sidebar-sub-headers
    display block
  .sidebar-group &
    padding 1rem 0 1rem 1rem
  .sidebar-group &.sidebar-header
    padding 0 0 0 2rem
  .sidebar-header &
    margin 0
    padding 1rem 0
  .sidebar-sub-headers &
    &.active
      font-weight 500
      border-right 3px solid $accentColor
      background-color $sidebarActiveColor
</style>
